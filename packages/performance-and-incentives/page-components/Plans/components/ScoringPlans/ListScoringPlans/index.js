import Header from './Header';
import List from './List';
import ListFilters from './ListFilters';
import useGetScoringConfigs from './useGetScoringConfigs';

function ListScoringPlans(props) {
	const { setActiveMode } = props;

	const { list, params, setParams, paginationData, getNextPage, loading, refetch } = useGetScoringConfigs();

	return (
		<>
			<Header setActiveMode={setActiveMode} />

			<ListFilters setParams={setParams} paginationData={paginationData} />

			<List
				list={list}
				paginationData={paginationData}
				getNextPage={getNextPage}
				loading={loading}
				refetch={refetch}
				params={params}
				setParams={setParams}
			/>
		</>
	);
}

export default ListScoringPlans;
