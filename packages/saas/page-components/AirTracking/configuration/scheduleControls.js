const TIME_ARRAY = [...Array(24).keys()].reduce((acc, curr) => {
	const hour = curr;
	const minutes = ['00', '15', '30', '45'];
	return acc.concat(
		minutes.map((minute) => `${hour}:${minute}`),
	);
}, []);

const TIME_OPTIONS = TIME_ARRAY.map((item) => ({
	label: item, value: item,
}));

const scheduleControls = ({ watchFrequency, t }) => {
	const freqOptions = [
		{
			name  : 'daily',
			value : 'daily',
			label : t('airOceanTracking:schedule_controls_frequency_options_1'),
		}, { name: 'weekly', value: 'weekly', label: t('airOceanTracking:schedule_controls_frequency_options_2') },
	];

	const weekOption = [
		{ name: 'sunday', value: 'sunday', label: t('airOceanTracking:schedule_controls_week_options_1') },
		{ name: 'monday', value: 'monday', label: t('airOceanTracking:schedule_controls_week_options_2') },
		{ name: 'tuesday', value: 'tuesday', label: t('airOceanTracking:schedule_controls_week_options_3') },
		{ name: 'wednesday', value: 'wednesday', label: t('airOceanTracking:schedule_controls_week_options_4') },
		{ name: 'thursday', value: 'thursday', label: t('airOceanTracking:schedule_controls_week_options_5') },
		{ name: 'friday', value: 'friday', label: t('airOceanTracking:schedule_controls_week_options_6') },
		{ name: 'saturady', value: 'saturady', label: t('airOceanTracking:schedule_controls_week_options_7') },
	];

	return [
		{
			name       : 'frequency',
			label      : t('airOceanTracking:schedule_controls_label_1'),
			type       : 'radio',
			options    : freqOptions,
			radioGroup : true,
			rules      : { required: t('airOceanTracking:schedule_controls_frequency_required_text') },
		},
		{
			name       : 'day',
			label      : t('airOceanTracking:schedule_controls_label_2'),
			type       : 'radio',
			options    : weekOption,
			show       : watchFrequency === 'weekly',
			radioGroup : true,
			rules      : { required: t('airOceanTracking:schedule_controls_day_required_text') },
		},
		{
			name            : 'time',
			label           : t('airOceanTracking:schedule_controls_label_3'),
			type            : 'time_picker',
			radioGroup      : true,
			use12hourformat : true,
			options         : TIME_OPTIONS,
			rules           : { required: t('airOceanTracking:schedule_controls_time_required_text') },
		},
	];
};

export default scheduleControls;
