export const tabs = ({ t = () => {} }) => [
	{
		key   : 'approved_awb',
		label : t('printingDesk:header_tabs_approved_awb'),
	},
	{
		key   : 'handed_over',
		label : t('printingDesk:header_tabs_handed_over'),
	},
	{
		key   : 'final_awb',
		label : t('printingDesk:header_tabs_final_awb'),
	},
	{
		key   : 'completed_awb',
		label : t('printingDesk:header_tabs_completed_awb'),
	},
];
