import Header from './Header';
import List from './List';
import useGetQuestList from './useGetQuestList';

function ListQuests({ setMode = () => {} }) {
	const { loading, list, paginationData, getNextPage, params, setParams } = useGetQuestList();

	return (
		<div>
			<Header setMode={setMode} />

			<List
				loading={loading}
				list={list}
				paginationData={paginationData}
				params={params}
				setParams={setParams}
				getNextPage={getNextPage}
			/>
		</div>
	);
}

export default ListQuests;
