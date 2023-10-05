function getOrgListOptions({ organizationData = {} }) {
	const { list = [] } = organizationData || {};

	return list.map((itm) => ({ value: itm?.id, label: itm?.business_name }));
}

export default getOrgListOptions;
