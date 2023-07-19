import getGeoConstants from '@cogoport/globalization/constants/geo';

const getEnrichmentTableColumns = ({ secondaryTab = '', authRoleId = '', columns = [] }) => {
	const geo = getGeoConstants();

	const is_manager_role = geo.uuid.third_party_enrichment_agencies_rm_ids.includes(authRoleId);

	let allowedColumns = geo.navigations.enrichment.manual_enrichment.columns.agent_view?.[secondaryTab];

	if (is_manager_role) {
		allowedColumns = geo.navigations.enrichment.manual_enrichment.columns.relationship_manager_view?.[secondaryTab];
	}

	const filteredColumns = columns.filter((listItem) => allowedColumns?.includes(listItem.id));

	return filteredColumns;
};

export default getEnrichmentTableColumns;
