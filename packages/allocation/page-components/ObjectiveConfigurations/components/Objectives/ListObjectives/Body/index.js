import List from './List';
import ObjectiveFilters from './ObjectiveFilters';

function Body(props) {
	const {
		setParams,
		loading,
		list,
		paginationData,
		getNextPage,
		setActiveMode,
	} = props;

	return (
		<>
			<ObjectiveFilters
				setParams={setParams}
			/>

			<List
				setActiveMode={setActiveMode}
				loading={loading}
				list={list}
				paginationData={paginationData}
				getNextPage={getNextPage}
			/>
		</>
	);
}

export default Body;
