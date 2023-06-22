import findCommonInArrays from './findCommonInArray';
import getSettingsModes from './getSettingsModes';

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

	if (commonMode.length >= 2) {
		return commonMode;
	}
	if (organizationSettingsMode?.length >= 2 && userSettingsMode?.length === 0) {
		return organizationSettingsMode;
	}
	if (organizationSettingsMode?.length === 0 && userSettingsMode?.length >= 2) {
		return userSettingsMode;
	}
	if (
		userSettingsMode?.length === 1
		&& userSettingsMode[0] === 'whatsapp'
		&& organizationSettingsMode?.length === 0
	) {
		return [isOrgCP ? 'mobile_otp' : 'booking_proof', 'whatsapp'];
	}
	return [];
};
export default getBookingTypeOptions;
