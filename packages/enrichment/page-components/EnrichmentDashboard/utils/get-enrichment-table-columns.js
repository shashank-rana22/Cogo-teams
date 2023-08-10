import getGeoConstants from '@cogoport/globalization/constants/geo';

const getEnrichmentTableColumns = ({ secondaryTab = '', authRoleId = '', columns = [] }) => {
	const geo = getGeoConstants();

	const is_enrichment_manager = geo.uuid.third_party_enrichment_agencies_rm_ids.includes(authRoleId);

	let columnsToHide = geo.navigations.enrichment.hide_columns.agent_view?.[secondaryTab];

	if (is_enrichment_manager) {
		columnsToHide = geo.navigations.enrichment.hide_columns.relationship_manager_view?.[secondaryTab];
	}

	const filteredColumns = columns.filter((listItem) => !columnsToHide?.includes(listItem.id));

	return filteredColumns;
};

export default getEnrichmentTableColumns;
