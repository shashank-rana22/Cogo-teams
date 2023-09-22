const ASYNC_KEY_MAPPING = {
	ocean : 'list_ocean_poc_details',
	air   : 'list_air_poc_details',
};

const customizeAlertControls = ({ branch_id = '', activeTab = 'ocean', t }) => [
	{
		name        : 'contactName',
		type        : 'async_select',
		placeholder : 'Select Contact',
		multiple    : true,
		isClearable : true,
		initialCall : true,
		asyncKey    : ASYNC_KEY_MAPPING[activeTab],
		params      : {
			organization_branch_id: branch_id,
		},
		getModifiedOptions: (data) => (data || []).map((item) => ({
			...item,
			value : item?.id,
			label : (
				<div>
					{`${item?.name} - ${item?.email}`}
				</div>
			),
		})),
		rules: { required: t('airOceanTracking:tracking_daily_report_toast_2') },
	},
];

export default customizeAlertControls;
