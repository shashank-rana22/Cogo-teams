import { isEmpty } from '@cogoport/utils';

import DotLoader from '../../../commons/DotLoader';
import useGetRollingForecastData from '../../../hooks/useGetRollingForecastData';

import GraphItem from './GraphItem';
import styles from './styles.module.css';

const ARRAY_LENGTH = 3;

function PieChartGraphs({
	searchId = '',
}) {
	const { data: rollingForecastData = {}, graphDataLoading } = useGetRollingForecastData({
		search_id: searchId,
	});

	const {
		persona_forecasts = {},
		weekly_forecasts = {},
		container_type_forecasts = {},
	} = rollingForecastData || {};

	const mapObject = {
		persona_forecasts,
		weekly_forecasts,
		container_type_forecasts,
	};

	if (graphDataLoading) {
		return (
			<div
				style={{
					display        : 'flex',
					justifyContent : 'space-evenly',
					width          : '100%',
					height         : '300px',
				}}
			>
				{[...Array(ARRAY_LENGTH).keys()].map((key) => (
					<div
						key={key}
						style={{
							display        : 'flex',
							justifyContent : 'center',
							alignItems     : 'center',
							background     : '#fff',
							padding        : '10px',
							marginBottom   : '10px',
							flexBasis      : '33%',
						}}
					>
						<DotLoader />
					</div>
				))}
			</div>
		);
	}

	if (isEmpty(rollingForecastData)) {
		return null;
	}

	return (
		<div className={styles.pie_chart_container}>
			{Object.entries(mapObject).map(([key, obj]) => (
				<GraphItem key={key} data={obj} type={key} />
			))}
		</div>
	);
}
export default PieChartGraphs;
