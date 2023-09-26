import { Tooltip, Datepicker } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import MyResponsivePie from '../../../Components/PieChart';
import ResponsiveBarChart from '../../../Components/ResponsiveBarChart';
import useGetBillStatusStats from '../../../hook/useGetBillStatusStats';
import useGetCommentRemarkCounts from '../../../hook/useGetCommentRemarkCounts';

import styles from './styles.module.css';

function RejectedCharts({ subActiveTabReject = '' }) {
	const [date, setDate] = useState(new Date());

	const [remarkDate, setRemarkDate] = useState(null);

	const { pieData = [], getData = () => {} } = useGetCommentRemarkCounts(remarkDate);

	const { data = [] } = useGetBillStatusStats(date);

	const formateData = (data || []).map((item) => {
		const { rejectedCount, auditedCount } = item || {};
		return (
			{
				...item,
				Rejected        : rejectedCount,
				'Total Audited' : auditedCount,
			}
		);
	});

	useEffect(() => {
		getData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [remarkDate]);

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
				<ResponsiveBarChart barData={formateData} />
			</div>
			<div className={styles.responsive_pie}>

				<MyResponsivePie
					data={pieData}
					title="Rejection Reason"
					subActiveTabReject={subActiveTabReject}
					remarkDate={remarkDate}
					setRemarkDate={setRemarkDate}
				/>
			</div>
		</div>
	);
}
export default RejectedCharts;
