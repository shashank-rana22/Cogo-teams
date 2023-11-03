import List from '../../ListQuests/List';
import useGetQuestList from '../hooks/useGetQuestList';

function OverlappedQuest({ params = {}, setParams = () => {} }) {
	const {
		loading,
		list,
		getNextPage,
		paginationData,
	} = useGetQuestList({ params, setParams });

	return (
		<List
			loading={loading}
			list={list}
			paginationData={paginationData}
			getNextPage={getNextPage}
			params={params}
			setParams={setParams}
		/>
	);
}

export default OverlappedQuest;
