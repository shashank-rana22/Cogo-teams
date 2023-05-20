const planListConfig = [
	{
		key   : 'display_name',
		title : 'Plan Name',
		width : '20%',
	},
	{
		key   : 'description',
		title : 'Plan Description',
		width : '20%',
	},
	{
		key        : 'family',
		title      : 'Family',
		width      : '23%',
		renderFunc : 'renderFamilyName',
	},
	{
		key        : 'updated_at',
		title      : 'Last Modified',
		width      : '20%',
		renderFunc : 'renderDate',
	},

	{
		key        : 'is_active',
		title      : '',
		width      : '17%',
		renderFunc : 'renderExtraDetails',
	},
];

const getPlanDetailsConfig = ({ isPlanDetail = false }) => {
	if (!isPlanDetail) return planListConfig;

	const familyIndex = planListConfig.findIndex((ele) => ele.key === 'family');

	if (familyIndex >= 0)planListConfig.splice(familyIndex, 1);
	return planListConfig;
};

export default planListConfig;
export { getPlanDetailsConfig };
