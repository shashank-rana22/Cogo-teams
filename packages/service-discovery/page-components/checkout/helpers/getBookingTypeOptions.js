import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import findCommonInArrays from './findCommonInArray';
import getSettingsModes from './getSettingsModes';

const ONE = 1;
const TWO = 2;

const getBookingTypeOptions = ({
	organization_settings,
	userSettings,
	isOrgCP,
}) => {
	const organizationSettingsMode = getSettingsModes(organization_settings);
	const userSettingsMode = getSettingsModes(userSettings);

	const commonMode = findCommonInArrays(
		userSettingsMode,
		organizationSettingsMode,
	);

	if (commonMode.length >= TWO) {
		return commonMode;
	}
	if (organizationSettingsMode?.length >= TWO && isEmpty(userSettingsMode)) {
		return organizationSettingsMode;
	}
	if (isEmpty(organizationSettingsMode) && userSettingsMode?.length >= TWO) {
		return userSettingsMode;
	}
	if (
		userSettingsMode?.length === ONE
		&& userSettingsMode[GLOBAL_CONSTANTS.zeroth_index] === 'whatsapp' && isEmpty(organizationSettingsMode)
	) {
		return [isOrgCP ? 'mobile_otp' : 'booking_proof', 'whatsapp'];
	}
	return [];
};
export default getBookingTypeOptions;
