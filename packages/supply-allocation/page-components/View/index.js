import { useSelector } from '@cogoport/store';
import { useEffect, Fragment } from 'react';

import useListFclSearchesView from '../../hooks/useListFclSearchesView';

import Header from './Header';
import List from './List';
import PieChartGraphs from './PieChartGraphs';

function View() {
	const { general = {} } = useSelector((state) => state);

	const { query = {} } = general;
	const { search_id } = query;

	const { data, findFclSearch, loading } = useListFclSearchesView({});

	useEffect(() => {
		findFclSearch(search_id);
	}, [findFclSearch, search_id]);

	const { list = [] } = data || {};
	const [firstSearch = {}] = list || [];

	const { origin_location_id = '', destination_location_id = '' } =		firstSearch || {};

	return (
		<Fragment key={search_id}>
			<Header firstSearch={firstSearch} loading={loading} />

			<PieChartGraphs
				originLocationId={origin_location_id}
				destinationLocationId={destination_location_id}
				listApiLoading={loading}
			/>

			<List search_id={search_id} />
		</Fragment>
	);
}

export default View;
