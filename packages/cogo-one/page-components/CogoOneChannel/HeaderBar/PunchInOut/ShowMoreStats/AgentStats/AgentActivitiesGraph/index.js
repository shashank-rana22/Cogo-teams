import { ResponsiveBar } from '@cogoport/charts/bar';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import formatData from '../../../../../../../helpers/formatGraphData';

import GraphLoader from './GraphLoader';
import styles from './styles.module.css';

function AgentActivityGraph({ loading = false, bookingCount = 0, callData = [], statsData = {} }) {
	const { chat_stats = {} } = statsData || {};
	const { active = 0 } = chat_stats || {};
	const {
		incoming_answered = 0,
		incoming_missed = 0,
		outgoing_answered = 0,
		outgoing_missed = 0,
	} = callData[GLOBAL_CONSTANTS.zeroth_index] || [];

	const callCount = incoming_answered + outgoing_answered + incoming_missed + outgoing_missed;

	const data = formatData({ bookingCount, active, callCount });

	if (loading) {
		return (
			<div className={styles.content}>
				<GraphLoader />
			</div>
		);
	}

	return (
		<div className={styles.content}>
			<ResponsiveBar
				data={data}
				keys={[
					'booked',
					'chats',
					'calls',
				]}
				indexBy="eventType"
				margin={{ top: 20, right: 0, bottom: 70, left: 8 }}
				padding={0.7}
				groupMode="grouped"
				valueScale={{ type: 'linear' }}
				colors={['#6FA5AB', '#88CAD1', '#CFEAED']}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize       : 2,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : '',
					legendPosition : 'middle',
					legendOffset   : 32,
				}}
				axisLeft={null}
				enableLabel={false}
				legends={[
					{
						dataFrom      : 'keys',
						anchor        : 'bottom-left',
						direction     : 'row',
						justify       : false,
						translateX    : 4,
						translateY    : 47,
						itemsSpacing  : 2,
						itemWidth     : 100,
						itemHeight    : 10,
						itemDirection : 'left-to-right',
						itemOpacity   : 0.85,
						symbolSize    : 15,
						effects       : [
							{
								on    : 'hover',
								style : {
									itemOpacity: 1,
								},
							},
						],
					},
				]}
				role="application"
				ariaLabel="Nivo bar chart demo"
				barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`}
			/>
		</div>
	);
}

export default AgentActivityGraph;
