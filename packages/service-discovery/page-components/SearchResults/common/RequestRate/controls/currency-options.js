import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getCurrencyOptions from '../../../../../helpers/getCurrencyOptions';

const ALLOWED_CURRENCY = GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service
	.common.services.feedback_services.allowed_currency;

const CURRENCY_CODE_OPTIONS = getCurrencyOptions({ ALLOWED_CURRENCY });

export default CURRENCY_CODE_OPTIONS;
