function getOrgListOptions({ organizationData = {}, viewType = '' }) {
	const { list = [] } = organizationData || {};

	const idToFetch = viewType === 'cp_support' ? 'twin_importer_exporter_id' : 'id';

	return list.map((itm) => ({ value: itm?.[idToFetch], label: itm?.business_name }));
}

export default getOrgListOptions;
