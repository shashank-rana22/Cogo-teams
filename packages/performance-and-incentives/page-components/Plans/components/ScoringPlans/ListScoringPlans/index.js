import Header from './Header';
import List from './List';
import ListFilters from './ListFilters';

function ListScoringPlans(props) {
	const { setActiveMode } = props;

	return (
		<>
			<Header setActiveMode={setActiveMode} />

			<ListFilters />

			<List />
		</>
	);
}

export default ListScoringPlans;
