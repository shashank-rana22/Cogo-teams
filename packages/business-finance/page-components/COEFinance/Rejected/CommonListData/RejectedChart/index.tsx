import { Tooltip, Datepicker, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';
import { useState, useEffect, memo } from 'react';

import MyResponsivePie from '../../../Components/PieChart';
import ResponsiveBarChart from '../../../Components/ResponsiveBarChart';
import useGetBillStatusStats from '../../../hook/useGetBillStatusStats';
import useGetCommentRemarkCounts from '../../../hook/useGetCommentRemarkCounts';

import styles from './styles.module.css';

const TOTAL_REJECTED_KEY_MAPPING = {
	coe_rejected : ['Total Audited', 'Rejected'],
	on_hold      : ['Total Audited', 'Rejected'],
};

function RejectedCharts({ subActiveTabReject = '' }) {
	const [date, setDate] = useState(null);

	const [remarkDate, setRemarkDate] = useState(null);

	const {
		pieData = [],
		getData = () => {},
		loading:pieChartLoading = false,
	} = useGetCommentRemarkCounts({ remarkDate, subActiveTabReject });

	const { data = [], loading = false } = useGetBillStatusStats({ date, subActiveTabReject });

	const formateData = (data || []).map((item) => {
		const { filteredStatusCount, auditedCount } = item || {};
		return (
			{
				...item,
				Rejected        : filteredStatusCount || 0,
				'Total Audited' : auditedCount || 0,
			}
		);
	});

	const handleOnClick = (value) => {
		if (value?.id === 'Rejected') {
			console.log(value, 'value');
		}
	};

	useEffect(() => {
		getData();
	}, [getData]);

	return (

		<div className={styles.container}>
			<div className={styles.responsive_bar_chart}>
				<div className={styles.text_filters_gap}>
					<div className={styles.text_style}>
						Total Rejected
						<div className={styles.border} />
					</div>

					<div className={styles.icon}>
						<Tooltip
							content={(
								<div className={styles.text_styles}>
									Showing rejection/on-hold of pre-payment
									{' '}
									<br />
									audit on daily basis
									<br />
									Bucketing of reasons for rejection/on-hold of
									{' '}
									<br />
									pre-payment audit 1st April onwards.
								</div>
							)}
							placement="right"
							caret={false}
						>

							<IcMInfo height={30} />
						</Tooltip>
						<div style={{ marginLeft: '20px' }}>
							<Datepicker
								placeholder="Enter Date"
								dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
								name="date"
								onChange={setDate}
								value={date}
								isPreviousDaysAllowed
								maxDate={new Date()}
							/>
						</div>
					</div>

				</div>
				{loading ? (
					<div className={styles.bar_chart_loader}>
						<Loader style={{ width: '80px' }} />
					</div>
				) : (
					<ResponsiveBarChart
						barData={formateData}
						handleOnClick={handleOnClick}
						keys={TOTAL_REJECTED_KEY_MAPPING[subActiveTabReject]}
					/>
				)}

			</div>
			<div className={styles.responsive_pie}>
				{pieChartLoading ? (
					<div className={styles.bar_chart_loader}>
						<Loader style={{ width: '80px' }} />
					</div>
				) : (
					<MyResponsivePie
						data={pieData}
						title="Rejection Reason"
						subActiveTabReject={subActiveTabReject}
						remarkDate={remarkDate}
						setRemarkDate={setRemarkDate}
					/>
				)}

			</div>
		</div>
	);
}
export default memo(RejectedCharts);
