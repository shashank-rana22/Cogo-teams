// import { ResponsiveLine } from '@cogoport/charts/line';
import { useSelector } from '@cogoport/store';

import UserProfile from '../../../common/UserStats/UserProfile';

import CreatePip from './CreatePip';
import styles from './styles.module.css';
import UpdatePip from './UpdatePip';

function DecisionModal() {
	const {
		general: {
			query: { user_id = '' },
		},
	} = useSelector((state) => state);

	const manager_name = 'Harshith';
	const type = 'update';
	// const {
	// 	performanceStatsList = [],
	// } = useGetFeedbackPerformanceStats({ userId, params });

	// const lineChartlist = [];

	// (performanceStatsList || []).forEach((stat) => {
	// 	const { month = '', rating = '' } = stat || {};
	// });
	// lineChartlist.push({ x: 'April', y: '3' });

	// const lineChartData = [{ id: 'x', data: lineChartlist }];
	return (
		<>
			<div className={styles.user_profile}>
				<UserProfile userId={user_id} />
				<div className={styles.lable}>
					Reports to :
					{' '}
					<b>{manager_name}</b>
				</div>
			</div>

			<div className={styles.container}>
				{/* <ResponsiveLine
					data={lineChartData}
					margin={{ top: 30, right: 40, bottom: 50, left: 60 }}
					xScale={{
						type    : 'point',
						stacked : true,
						min     : 0,
						max     : 12,
					}}
					yScale={{
						type     : 'linear',
						tickSize : 5,
						min      : 1,
						max      : 5,
						reverse  : false,
						stacked  : false,
					}}
					yFormat=" >-.2f"
					curve="natural"
					lineWidth={3}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						orient         : 'bottom',
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : 'Months',
						legendOffset   : 36,
						legendPosition : 'middle',
					}}
					axisLeft={{
						orient         : 'left',
						tickValues     : 5,
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : 'KPI',
						legendOffset   : -40,
						legendPosition : 'middle',
					}}
					enableGridX={false}
					pointSize={8}
					pointBorderWidth={7}
					pointLabelYOffset={-12}
					areaOpacity={0.5}
					useMesh
					colors={['#F2E3C3', '#F9AE64', '#828282']}
					colorBy="index"
				/> */}

				{type === 'create' && (
					<CreatePip />
				)}

				{type === 'update' && (
					<UpdatePip />
				)}
			</div>
		</>
	);
}

export default DecisionModal;
