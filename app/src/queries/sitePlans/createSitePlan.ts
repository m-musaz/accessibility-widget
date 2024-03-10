import { gql } from 'graphql.macro';

export default gql`
  mutation CreateSitesPlan($paymentMethodToken: String!, $planName: String!, $billingType: BillingType!, $siteId: Int!) {
    createSitesPlan(paymentMethodToken: $paymentMethodToken, planName: $planName, billingType: $billingType, siteId: $siteId)
  }
`;
