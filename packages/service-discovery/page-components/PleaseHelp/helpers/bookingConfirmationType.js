import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import findCommonInArrays from './findCommonInArray';
import getSettingsModes from './getSettingsModes';

const bookingConfirmationType = ({ organization_settings, userSettings }) => {
	const organization_settings_mode = getSettingsModes(organization_settings);
	const user_settings_mode = getSettingsModes(userSettings);

	const commonMode = findCommonInArrays(
		user_settings_mode,
		organization_settings_mode,
	);

	if (!isEmpty(commonMode)) {
		return commonMode[GLOBAL_CONSTANTS.zeroth_index];
	}
	if (!isEmpty(organization_settings_mode)) {
		return organization_settings_mode[GLOBAL_CONSTANTS.zeroth_index];
	}
	if (
		isEmpty(organization_settings_mode)
		&& !isEmpty(commonMode)
	) {
		return user_settings_mode[GLOBAL_CONSTANTS.zeroth_index];
	}
	return null;
};

export default bookingConfirmationType;
