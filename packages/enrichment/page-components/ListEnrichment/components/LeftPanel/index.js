import getGeoConstants from '@cogoport/globalization/constants/geo';

import Enrichment from '../../common/Enrichment';

const geo = getGeoConstants();

function LeftPanel(props) {
	const {
		list,
		loading,
		paginationData,
		columns,
		getNextPage,
		activeTab,
		globalFilters,
		setGlobalFilters,
		debounceQuery,
		searchValue,
		setSearchValue,
		listRefetch,
		authRoleId,
	} = props;

	const allowedColumns = geo.navigations.enrichment.enrichment_requests.columns;

	const filteredColumns = columns.filter((listItem) => allowedColumns?.includes(listItem.id));

	return (
		<Enrichment
			list={list}
			loading={loading}
			paginationData={paginationData}
			columns={filteredColumns}
			getNextPage={getNextPage}
			activeTab={activeTab}
			globalFilters={globalFilters}
			setGlobalFilters={setGlobalFilters}
			debounceQuery={debounceQuery}
			searchValue={searchValue}
			setSearchValue={setSearchValue}
			showStatistics
			listRefetch={listRefetch}
			authRoleId={authRoleId}
		/>
	);
}

export default LeftPanel;
