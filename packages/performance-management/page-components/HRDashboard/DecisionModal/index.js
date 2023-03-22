import { ResponsiveLine } from '@cogoport/charts/line';
import { Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import UserProfile from '../../../common/UserStats/UserProfile';

import Create from './CreatePip';
import styles from './styles.module.css';
import Update from './UpdatePip';

function DecisionModal({
	item, setItem = () => { }, setDisableNext = () => {},
	type, show, setShow = () => {},
}) {
	const manager_name = 'Harshith';

	// const {
	// 	performanceStatsList = [],
	// } = useGetFeedbackPerformanceStats({ userId, params });

	const lineChartlist = [{ x: 'April', y: '3' }];

	// (performanceStatsList || []).forEach((stat) => {
	// 	const { month = '', rating = '' } = stat || {};
	// });

	const lineChartData = [{ id: 'x', data: lineChartlist }];
	return (
		<>
			<div className={styles.user_profile}>
				<UserProfile userId={item.user_id} />
				<div className={styles.lable}>
					Reports to :
					{' '}
					<b>{manager_name}</b>
				</div>
			</div>

			<div className={styles.container}>
				<div>
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
				</div>

				<div className={styles.sub_container}>
					{type === 'create' ? (
						<Create
							item={item}
							setItem={setItem}
							setDisableNext={setDisableNext}
						/>
					) : (
						<Update show={show} setShow={setShow} />
					)}
				</div>
			</div>
		</>
	);
}

export default DecisionModal;
