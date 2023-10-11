export const getSidFilterControls = ({ setValue = () => {}, t = () => {} }) => [
	{
		label   : t('myTickets:id_type'),
		name    : 'id_type',
		options : [
			{ label: t('myTickets:sid'), value: 'sid' },
			{ label: t('myTickets:missing_id'), value: 'missing_id' },
			{ label: t('myTickets:dislike_id'), value: 'dislike_id' },
		],
		controllerType : 'select',
		placeholder    : 'Select',
		onChange       : () => { setValue('serial_id', ''); },
	},
	{
		label          : t('myTickets:serial_id'),
		name           : 'serial_id',
		controllerType : 'number',
		placeholder    : t('myTickets:enter_serial_id'),
		arrow          : false,
		step           : 1,
		min            : 0,
	},
];
