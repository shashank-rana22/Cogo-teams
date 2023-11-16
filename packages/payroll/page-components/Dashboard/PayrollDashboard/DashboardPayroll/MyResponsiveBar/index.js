import { ResponsiveBar } from '@cogoport/charts/bar';

import styles from './styles.module.css';

const MODIFIER_VALUE = 1.6;

function MyResponsiveBar({ data = [] }) {
	return (
		<div className={styles.bar_chart}>
			<ResponsiveBar
				data={data}
				keys={[
					'Salary',
					'Others',
				]}
				indexBy="month"
				margin={{ top: 50, right: 50, bottom: 50, left: 80 }}
				padding={0.3}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={({ id }) => {
					if (id === 'Salary') {
						return '#ACDADF';
					} if (id === 'Others') {
						return '#4F4F4F';
					}
					return 'gray';
				}}
				enableLabel={false}
				enableGridY={false}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize     : 5,
					tickPadding  : 5,
					tickRotation : 0,
					legendOffset : 32,
				}}
				axisLeft={{
					tickSize     : 5,
					tickPadding  : 5,
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
