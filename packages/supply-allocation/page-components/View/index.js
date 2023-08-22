import { useSelector } from '@cogoport/store';
import { useEffect, Fragment } from 'react';

import useGetRollingForecastBucketsData from '../../hooks/useGetRollingForeCastBucketsData';
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

	const { data: bucketData } = useGetRollingForecastBucketsData({
		supply_fcl_freight_search_id: search_id,
	});

	const bucketsArray = bucketData?.map((bucket) => bucket.bucket_type);

	return (
		<Fragment key={search_id}>
			<Header firstSearch={firstSearch} loading={loading} />

			<PieChartGraphs
				originLocationId={origin_location_id}
				destinationLocationId={destination_location_id}
				listApiLoading={loading}
			/>

			<List
				bucketData={bucketData}
				search_id={search_id}
				bucketsArray={bucketsArray}
			/>
		</Fragment>
	);
}

export default View;
