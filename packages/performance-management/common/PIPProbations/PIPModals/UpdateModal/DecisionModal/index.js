import { ResponsiveLine } from '@cogoport/charts/line';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../EmptyState';
import UserProfile from '../../../../UserStats/UserProfile';
import useGetFeedbackPerformanceStats from '../../../../../hooks/useGetFeedbackPerformanceStats';

import Create from './CreatePip';
import styles from './styles.module.css';
import Update from './UpdatePip';

function DecisionModal({
	item,
	status = '',
	setItem = () => { },
	setDisableNext = () => {},
	type,
}) {
	const {
		performanceStatsList = [],
	} = useGetFeedbackPerformanceStats({ userId: item?.user_id });

	const lineChartlist = [];

	(performanceStatsList || []).forEach((stat) => {
		const { month = '', rating = '' } = stat || {};
		lineChartlist.push({ x: month, y: rating });
	});

	const lineChartData = [{ id: 'x', data: lineChartlist }];
	return (
		<>
			<div className={styles.user_profile}>
				<UserProfile userId={item.user_id} />
				<div className={styles.label}>
					Reports to :
					{' '}
					<b>{item?.manager_name}</b>
				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.line_graph}>
					{isEmpty(lineChartlist) ? (
						<EmptyState
							height={140}
							width={220}
							emptyText="Yearly Graph Stats Not Found"
							textSize="12px"
							flexDirection="column"
						/>
					) : (
						<ResponsiveLine
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
						/>
					)}
				</div>

				<div className={styles.sub_container}>
					{type === 'create' ? (
						<Create
							item={item}
							status={status}
							setItem={setItem}
							setDisableNext={setDisableNext}
						/>
					) : (
						<Update
							item={item}
							setItem={setItem}
							setDisableNext={setDisableNext}
						/>
					)}
				</div>
			</div>
		</>
	);
}

export default DecisionModal;
