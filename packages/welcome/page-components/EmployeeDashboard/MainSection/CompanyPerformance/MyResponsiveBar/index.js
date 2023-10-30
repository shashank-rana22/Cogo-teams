import { ResponsiveBar } from '@cogoport/charts/bar';

import styles from './styles.module.css';

const MODIFIER_VALUE = 1.6;

function MyResponsiveBar({ depDetails = [] }) {
	return (
		<div className={styles.bar_chart}>
			<ResponsiveBar
				data={depDetails || []}
				keys={[
					'working_hours',
				]}
				indexBy="month"
				margin={{ top: 50, right: 50, bottom: 30, left: 30 }}
				padding={0.3}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={['#ACDADF', '#4F4F4F']}
				enableLabel={false}
				enableGridY={false}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize     : 0,
					tickPadding  : 8,
					tickRotation : 0,
					legendOffset : 32,
				}}
				axisLeft={{
					tickSize     : 0,
					tickPadding  : 8,
					tickRotation : 0,
					legendOffset : -40,
				}}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{
					from      : 'color',
					modifiers : [
						[
							'darker',
							MODIFIER_VALUE,
						],
					],
				}}
				role="application"
			/>
		</div>
	);
}

export default MyResponsiveBar;
