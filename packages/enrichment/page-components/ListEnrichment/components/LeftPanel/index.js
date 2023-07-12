import { LIST_PRIMARY_COLUMNS_MAPPING } from '../../../../constants/table-columns-mapping';
import Enrichment from '../../common/Enrichment';

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
		partnerId,
	} = props;

	const filteredColumns = columns.filter(
		(listItem) => LIST_PRIMARY_COLUMNS_MAPPING[activeTab]?.includes(listItem.id),
	);

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
			partnerId={partnerId}
		/>
	);
}

export default LeftPanel;
