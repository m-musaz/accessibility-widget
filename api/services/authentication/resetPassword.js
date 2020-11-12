import pkg from 'apollo-server-express';
import dayjs from 'dayjs';
import _ from 'lodash';
import Validator from 'fastest-validator';
import { updateUser } from '../../repository/user.repository.js';
import { generatePassword } from '../../helpers/hashing.helper.js';
import { findRecordByToken, removeUserToken } from '../../repository/user_token.repository.js';
import logger from '../../utils/logger.js';

const { ApolloError, ValidationError, ForbiddenError, UserInputError } = pkg;

function resetPasswordValidation(data) {
	const validator = new Validator();
	const schema = {
    password: { type: "string", min: 6, max: 50, optional: true, empty: false },
  }
  return validator.validate(data, schema);
}

export async function resetPasswordUser(token, password, confirmPassword) {
  // try {
    const isValidInput = resetPasswordValidation({ password });
    if (_.isArray(isValidInput)) {
      throw new UserInputError(isValidInput.map((it) => it.message).join(','), {
        invalidArgs: isValidInput.map((it) => it.field).join(','),
      });
    }
    if (password !== confirmPassword) {
      return new ValidationError('Password and confirm password do not match');
    }
    const session = await findRecordByToken(token);
    if (!session || !session.id) {
      throw new ApolloError('Session not found');
    }
    if ((dayjs(session.updated_at).add(15, 'm').diff(dayjs()) < 0)) {
      throw new ForbiddenError('Session expired');
    }
    const [newPassword] = await Promise.all([
      generatePassword(password),
      removeUserToken(session.id),
    ]);
    await updateUser(session.user_id, { password: newPassword });
    return true;
  // } catch (error) {
  //   logger.error(error);
  //   throw new ApolloError('Something went wrong!');
  // }
}