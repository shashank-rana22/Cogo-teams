import { ResponsiveBar } from '@cogoport/charts/bar';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const data = [
	{
		warmth: 'ice_cold', count: 0, label: 'Ice Cold',
	},
	{
		warmth: 'cold', count: 0, label: 'Cold',
	},
	{
		warmth: 'warm', count: 0, label: 'Warm',
	},
	{
		warmth: 'hot', count: 0, label: 'Hot',
	},
	{
		warmth: 'flaming_hot', count: 0, label: 'Flaming Hot',
	},
];

function ScoreDistributionGraph(props) {
	const { graphData } = props;

	if (isEmpty(graphData)) {
		return null;
	}

	const newData = data.map((element) => {
		const datum = graphData.find((item) => element.warmth === item.warmth);

		return { ...element, ...(datum && { count: datum.count }) };
	});

	return (
		<div className={styles.container}>
			<ResponsiveBar
				data={newData}
				keys={['count']}
				indexBy="label"
				margin={{ top: 90, right: 60, bottom: 90, left: 150 }}
				padding={0.5}
				valueScale={{
					type: 'linear',
				}}
				colors={['#888FD1']}
				axisBottom={{
					tickSize       : 0,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : 'Warmth',
					legendPosition : 'middle',
					legendOffset   : 60,
				}}
				axisLeft={{
					tickSize       : 0,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : 'Accounts',
					legendPosition : 'middle',
					legendOffset   : -80,
				}}
				enableGridY
				enableLabel={false}
			/>
		</div>
	);
}

export default ScoreDistributionGraph;
