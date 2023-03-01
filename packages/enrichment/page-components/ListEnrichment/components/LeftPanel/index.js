import { LIST_PRIMARY_COLUMNS_MAPPING } from '../../../../constants/get-table-columns';
import Enrichment from '../Enrichment';

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
	} = props;

	// eslint-disable-next-line max-len
	const filteredColumns = columns.filter((listItem) => LIST_PRIMARY_COLUMNS_MAPPING[activeTab]?.includes(listItem.id));

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
		/>

	);
}

export default LeftPanel;
