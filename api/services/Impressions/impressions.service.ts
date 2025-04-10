import logger from '~/utils/logger';

import { FindAllowedSitesProps } from '~/repository/sites_allowed.repository';

import { findVisitorByIp } from '~/repository/visitors.repository';
import { findImpressionsSiteId, insertImpressions, updateImpressions, findImpressionsURL, insertImpressionURL, findEngagementURLDate, findImpressionsURLDate, updateImpressionProfileCount } from '~/repository/impressions.repository';
import { findSite } from '../allowedSites/allowedSites.service';
import { addNewVisitor } from '../uniqueVisitors/uniqueVisitor.service';

import { getIpAddress } from '~/helpers/uniqueVisitor.helper';

// type GetDocumentsResponse = {
//   documents: FindDocumentsResponse;
//   count: number;
// };

/**
 * Add impressions
 *
 * @param {number} siteId
 * @param {string} ipAddress
 */
export async function addImpressions(siteId: number, ipAddress: string): Promise<number[]> {
    //   const validateResult = createValidation({ name, body });
    //   if (Array.isArray(validateResult) && validateResult.length) {
    //     throw new ValidationError(validateResult.map((it) => it.message).join(','));
    //   }

    try {
        const visitor = await findVisitorByIp(ipAddress);

        if (visitor) {
            const data = {
                site_id: siteId,
                visitor_id: visitor.id,
            };

            const response = await insertImpressions(data);
            return response;
        }
        else {
            await addNewVisitor(ipAddress, siteId);
            const visitor = await findVisitorByIp(ipAddress);
            const data = {
                site_id: siteId,
                visitor_id: visitor.id
            }

            const response = await insertImpressions(data);
            return response;
        }

    } catch (error) {
        logger.error(error);
        throw error;
    }
}

export async function addImpressionsURL(ipAddress: string, url: string): Promise<number[]> {
  
    try {
        const visitor = await findVisitorByIp(ipAddress);

        if (visitor) {
            const data = {
                visitor_id: visitor.id
            }

            const response = await insertImpressionURL(data, url);
            return response
        }
        else {
            const site = await findSite(url);
            await addNewVisitor(ipAddress, site.id);
            const visitor = await findVisitorByIp(ipAddress);
            const data = {
                visitor_id: visitor.id
            }
            const response = await insertImpressionURL(data, url);
            return response;
        }

    } catch (error) {
        logger.error(error);
        throw error;
    }
}

/**
 * Get List Impressions
 *
 * @param {number} userId
 * @param {string} url
 *
 */

export async function findImpressionsByURL(userId: number, url: string) {
    try {
        const impressions = await findImpressionsURL(userId, url);
        return { impressions: impressions, count: impressions.length };
    }
    catch (e) {
        logger.error(e)
        throw e
    }
}

export async function findImpressionsByURLAndDate(userId: number, url: string, startDate: Date, endDate: Date) {
    try {
        const impressions = await findImpressionsURLDate(userId, url, startDate, endDate);
        return { impressions: impressions, count: impressions.length };
    }
    catch (e) {
        logger.error(e);
        throw e;
    }
}


export async function findImpressionsBySiteId(siteId: number) {
    try {
        const impressions = await findImpressionsSiteId(siteId);
        return { impressions: impressions, count: impressions.length };
    }
    catch (e) {
        logger.error(e);
        throw e;
    }
}

/**
 * Add interaction in impressions
 *
 * @param {number} siteId
 * @param {string} interaction can be widgetClosed or widgetOpened
 *
 */


export async function addInteraction(siteId: number, interaction: string) {
    try {
        if (interaction !== 'widgetClosed' && interaction !== 'widgetOpened') {
            throw new Error('Invalid interaction type. Only "widgetClosed" or "widgetOpened" are acceptable.');
        }
        return await updateImpressions(siteId, interaction)
    }
    catch (e) {
        logger.error(e);
        throw e;
    }
}

export async function addProfileCount(impressionId: number, profileCount: any): Promise<{ success: boolean; message: string }> {
    try {
        const updatedRows = await updateImpressionProfileCount(impressionId, profileCount);

        if (updatedRows > 0) {
            return {
                success: true,
                message: 'Profile counts updated successfully',
            };
        } else {
            return {
                success: false,
                message: 'No rows were updated. Invalid impression ID.',
            };
        }
    } catch (e) {
        console.error('Error updating profile count:', e);
        logger.error(e);
        return {
            success: false,
            message: 'An error occurred while updating profile counts.',
        };
    }
}

export async function getEngagementRates(userId: number, url: string, startDate: string, endDate: string) {
    try {
        const impressions = await findEngagementURLDate(userId, url, startDate, endDate);
        return impressions;
    }
    catch (e) {
        logger.error(e);
        throw e;
    }
}

