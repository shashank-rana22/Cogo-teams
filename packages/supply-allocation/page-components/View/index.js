import { useSelector } from '@cogoport/store';
import { Fragment } from 'react';

import Header from './Header';
import List from './List';
import PieChartGraphs from './PieChartGraphs';

function View() {
	const { general = {} } = useSelector((state) => state);

	const { query = {} } = general;
	const { search_id } = query;

	return (
		<Fragment key={search_id}>
			<Header searchId={search_id} />

			<PieChartGraphs
				searchId={search_id}
			/>

			<List search_id={search_id} />
		</Fragment>
	);
}

export default View;
