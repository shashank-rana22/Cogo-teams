import Header from './Header';
import List from './List';
import ListFilters from './ListFilters';

function ListScoringPlans(props) {
	const { setActiveMode, setParams } = props;

	return (
		<>
			<Header setActiveMode={setActiveMode} />

			<ListFilters setParams={setParams} />

			<List />
		</>
	);
}

export default ListScoringPlans;
