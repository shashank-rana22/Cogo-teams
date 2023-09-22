const getCommodityControls = ({ t }) => [
	{
		name               : 'hscode',
		label              : t('airOceanTracking:tracking_commodity_control_label_1'),
		type               : 'async_select',
		asyncKey           : 'six_digit_hs_code',
		placeholder        : t('airOceanTracking:tracking_commodity_control_placeholder_1'),
		initialCall        : true,
		rules              : { required: t('airOceanTracking:tracking_commodity_control_required_text_1') },
		getModifiedOptions : (data) => (data || []).map((info) => ({
			...info,
			value : info?.hsCode,
			label : (
				<div>
					{info?.hsCode}
					{' '}
					-
					{' '}
					{info?.description}
				</div>
			),
		})),
	},
];
export default getCommodityControls;
