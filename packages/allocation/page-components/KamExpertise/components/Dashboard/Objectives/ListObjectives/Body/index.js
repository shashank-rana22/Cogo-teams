import Filters from './Filters';
import List from './List';

function Body(props) {
	const {
		setActionMode = () => { },
		params = {},
		setParams = () => { },
		data = {},
		loading: loadingListObjectives = false,
		refetchListObjectives = () => { },
		debounceQuery,
	} = props;

	return (
		<section>
			<Filters
				params={params}
				setParams={setParams}
				debounceQuery={debounceQuery}
			/>
			<List
				data={data}
				setActionMode={setActionMode}
				loadingListObjectives={loadingListObjectives}
				listObjectiveParams={params}
				setListObjectivesParams={setParams}
				refetchListObjectives={refetchListObjectives}
			/>
		</section>
	);
}

export default Body;
