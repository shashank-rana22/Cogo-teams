import { useSelector } from '@cogoport/store';
import { useEffect, Fragment } from 'react';

import useGetRollingForecastBucketsData from '../../hooks/useGetRollingForeCastBucketsData';
import useGetRollingForecastData from '../../hooks/useGetRollingForecastData';
import useListFclSearchesView from '../../hooks/useListFclSearchesView';

import Header from './Header';
import List from './List';
import PieChartGraphs from './PieChartGraphs';

function View() {
	const { general = {} } = useSelector((state) => state);
	const { query = {} } = general;
	const { search_id } = query;
	const { data, findFclSearch } = useListFclSearchesView({});

	useEffect(() => {
		findFclSearch(search_id);
	}, [findFclSearch, search_id]);

	const { list = [] } = data || {};
	const [firstSearch = {}] = list || [];
	const {
		origin_location_id = '',
		origin_location = {},
		destination_location = {},
		destination_location_id = '',
	} = firstSearch || {};

	const { data: rollingForecastData = {} } = useGetRollingForecastData({
		origin_location_id, destination_location_id,
	});

	const { data:bucketData } = useGetRollingForecastBucketsData({ supply_fcl_freight_search_id: search_id });

	return (
		<Fragment key={search_id}>
			<Header
				firstSearch={firstSearch}
			/>

			<PieChartGraphs rollingForecastData={rollingForecastData} />

			<List bucketData={bucketData} />
		</Fragment>
	);
}

export default View;
