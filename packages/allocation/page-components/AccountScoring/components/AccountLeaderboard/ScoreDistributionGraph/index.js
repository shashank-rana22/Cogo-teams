import { ResponsiveBar } from '@cogoport/charts/bar';

import styles from './styles.module.css';

function index(props) {
	const { graphData } = props;
	return (
		<div className={styles.container}>
			<ResponsiveBar
				data={graphData}
				keys={['count']}
				indexBy="warmth"
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

export default index;
