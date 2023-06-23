import findCommonInArrays from './findCommonInArray';
import getSettingsModes from './getSettingsModes';

const bookingConfirmationType = ({ organization_settings, userSettings }) => {
	const organization_settings_mode = getSettingsModes(organization_settings);
	const user_settings_mode = getSettingsModes(userSettings);

	const commonMode = findCommonInArrays(
		user_settings_mode,
		organization_settings_mode,
	);

	if (commonMode.length !== 0) {
		return commonMode[0];
	}
	if (organization_settings_mode?.length !== 0) {
		return organization_settings_mode[0];
	}
	if (
		organization_settings_mode?.length === 0
		&& user_settings_mode?.length !== 0
	) {
		return user_settings_mode[0];
	}
	return null;
};

export default bookingConfirmationType;
