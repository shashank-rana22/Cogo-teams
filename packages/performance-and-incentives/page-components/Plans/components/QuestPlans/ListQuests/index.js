import useGetQuestList from '../hooks/useGetQuestList';
import useUpdateQuest from '../hooks/useUpdateQuest';

import Header from './Header';
import List from './List';

function ListQuests() {
	const {
		loading,
		list,
		paginationData, getNextPage, params, setParams,
		refetch,
		debounceQuery,
		control,
	} = useGetQuestList({ manual: false });

	const { handleClick } = useUpdateQuest({ afterUpdate: refetch });

	return (
		<>
			<Header control={control} debounceQuery={debounceQuery} />

			<List
				loading={loading}
				list={list}
				paginationData={paginationData}
				params={params}
				setParams={setParams}
				getNextPage={getNextPage}
				handleUpdate={handleClick}
			/>
		</>
	);
}

export default ListQuests;
