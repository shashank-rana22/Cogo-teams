const getOrgOptions = ({ organizations = [] }) => organizations?.map(
	(eachOrg) => (
		{
			label : eachOrg?.business_name,
			value : eachOrg?.organization_id,
		}),
) || [];

export {
	getOrgOptions,
};
