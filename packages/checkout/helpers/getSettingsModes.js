const getSettingsModes = (settings_modes) => (
	settings_modes?.filter((x) => x.setting_type === 'checkout')[0]
		?.setting_config?.booking_confirmation_modes || []
);

export default getSettingsModes;
