import useDeactivateQuest from '../hooks/useDeactivateQuest';
import useGetQuestList from '../hooks/useGetQuestList';

import Header from './Header';
import List from './List';

function ListQuests() {
	const {
		loading,
		list,
		paginationData, getNextPage, params, setParams,
		refetch,
	} = useGetQuestList({ manual: false });

	const { handleClick } = useDeactivateQuest({ afterDeactivate: refetch });

	return (
		<div>
			<Header />

			<List
				loading={loading}
				list={list}
				paginationData={paginationData}
				params={params}
				setParams={setParams}
				getNextPage={getNextPage}
				handleDeactivate={handleClick}
			/>
		</div>
	);
}

export default ListQuests;
