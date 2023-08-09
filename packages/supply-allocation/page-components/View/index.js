import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetRollingForecastData from '../../hooks/useGetRollingForecastData';
import useListFclSearches from '../../hooks/useListFclSearches';

import Header from './Header';
import List from './List';

const CONTAINER_TYPE_COLOR_MAPPING = {
	standard  : '#FBD1A6',
	refer     : '#FFDAB5',
	flat_rack : ' #FFC790',
	iso_tank  : ' #E49E58',
	open_side : '#F3BA81',
	open_top  : '#EFCAA5',
};

const generateData = ({ container_type_forecasts }) => Object.keys(container_type_forecasts || {}).reduce(
	(acc, curr) => {
		const { graphData, count } = acc;

		return {
			graphData: [
				...graphData,
				{
					id    : curr,
					label : startCase(curr),
					value : container_type_forecasts[curr],
					color : CONTAINER_TYPE_COLOR_MAPPING[curr],
				},
			],
			count: count + container_type_forecasts[curr],
		};
	},
	{ graphData: [], count: 0 },
);

function View() {
	const { general = {} } = useSelector((state) => state);
	const { query = {} } = general;
	const { search_id } = query;
	const { data, findFclSearch, loading } = useListFclSearches();

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

	const { display_name: originName } = origin_location;
	const { display_name: destinationName } = destination_location;
	const { data: rollingForecastData = {} } = useGetRollingForecastData({
		origin_location_id, destination_location_id,
	});

	const { container_type_forecasts = {} } = rollingForecastData || {};
	const { graphData, count } = generateData({ container_type_forecasts });

	return (
		<>
			<Header graphData={graphData} count={count} originName={originName} destinationName={destinationName} />
			<List />
		</>
	);
}

export default View;
