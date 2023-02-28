import { ResponsivePie } from '@cogoport/charts/pie';
import { startCase } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import useEnrichmentStats from '../../hooks/useEnrichmentStats';

import styles from './styles.module.css';

function Statistics() {
	const { stats = {}, loading = false } = useEnrichmentStats();

	const dummyData = {
		requested_feedback_request_count : 5,
		tat_less_than_equal_to_one_day   : 3,
		tat_one_to_three_day             : 5,
		tat_three_to_seven_day           : 2,
		tat_greater_than_seven_dat       : 1,
		total_responded_request_count    : 6,
	};

	const chart_data_1 = [
		{
			id    : 'enrichment_requests',
			label : 'Enrichment Requests',
			value : dummyData.requested_feedback_request_count,
		},
		{
			id    : 'responded_requests',
			label : 'Responded Requests',
			value : dummyData.total_responded_request_count,
		},

	];

	const chart_data_2 = [
		{
			id    : 'zero_to_one_days',
			label : '0-1 Days',
			value : dummyData.tat_less_than_equal_to_one_day,
		},
		{
			id    : 'one_to_three_days',
			label : '1-3 Days',
			value : dummyData.tat_one_to_three_day,
		},
		{
			id    : 'three_to_seven_days',
			label : '3-7 Days',
			value : dummyData.tat_three_to_seven_day,

		},
		{
			id    : 'greater_than_seven_days',
			label : '> 7 Days',
			value : dummyData.tat_greater_than_seven_dat,
		},
	];

	const isEmpty = Object.values(stats).every((item) => item === 0);

	if (isEmpty && !loading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={140}
					width={220}
					emptyText="Pie Stats Not Found"
					textSize="12px"
					flexDirection="column"
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>

			<ResponsivePie
				data={chart_data_1}
				innerRadius={0}
				activeOuterRadiusOffset={8}
				enableArcLinkLabels={false}
				enableArcLabels={false}
				colors={['#CFEAED', '#ACDADF']}
				colorBy="index"
				margin={{ top: 20, right: 40, bottom: 80, left: 40 }}
				legends={[
					{
						anchor        : 'bottom-left',
						direction     : 'column',
						justify       : false,
						translateX    : 0,
						translateY    : 56,
						itemsSpacing  : 5,
						itemWidth     : 100,
						itemHeight    : 18,
						itemTextColor : '#221F20',
						itemDirection : 'left-to-right',
						itemOpacity   : 1,
						symbolSize    : 12,
						symbolShape   : 'circle',
						effects       : [
							{
								on    : 'hover',
								style : {
									itemTextColor: 'red',
								},
							},
						],
					},
				]}
				tooltip={({
					datum: { id, value },
				}) => (
					<div className={styles.pie_tooltip}>
						<strong>
							{startCase(id)}
							:
							{' '}
							{value}
						</strong>
					</div>
				)}
			/>

			<ResponsivePie
				data={chart_data_2}
				innerRadius={0}
				activeOuterRadiusOffset={8}
				enableArcLinkLabels={false}
				enableArcLabels={false}
				colors={['#F7FAEF', '#C4DC91', '#ABCD62', '#849E4C']}
				colorBy="index"
				margin={{ top: 20, right: 40, bottom: 80, left: 40 }}
				legends={[
					{
						anchor        : 'bottom-left',
						direction     : 'column',
						justify       : false,
						translateX    : 0,
						translateY    : 56,
						itemsSpacing  : 5,
						itemWidth     : 100,
						itemHeight    : 18,
						itemTextColor : '#221F20',
						itemDirection : 'left-to-right',
						itemOpacity   : 1,
						symbolSize    : 12,
						symbolShape   : 'circle',
						effects       : [
							{
								on    : 'hover',
								style : {
									itemTextColor: 'red',
								},
							},
						],
					},
				]}
				tooltip={({
					datum: { id, value },
				}) => (
					<div className={styles.pie_tooltip}>
						<strong>
							{startCase(id)}
							{' '}
							:
							{' '}
							{value}
						</strong>
					</div>
				)}
			/>
		</div>
	);
}

export default Statistics;
