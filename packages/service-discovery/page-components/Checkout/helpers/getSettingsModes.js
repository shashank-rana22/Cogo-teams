import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getSettingsModes = (settings_modes) => (
	settings_modes?.filter((x) => x.setting_type === 'checkout')[GLOBAL_CONSTANTS.zeroth_index]
		?.setting_config?.booking_confirmation_modes || []
);

export default getSettingsModes;
