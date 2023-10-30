import { Tooltip, Datepicker, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';
import { format, getMonth, getYear } from '@cogoport/utils';
import { useState, useEffect, memo } from 'react';

import MyResponsivePie from '../../../Components/PieChart/index';
import ResponsiveBarChart from '../../../Components/ResponsiveBarChart/index';
import useGetBillStatusStats from '../../../hook/useGetBillStatusStats';
import useGetCommentRemarkCounts from '../../../hook/useGetCommentRemarkCounts';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;
const APRIL_MONTH_INDEX = 3;
const BEFORE_APRIL = 1;

const TOTAL_REJECTED_KEY_MAPPING = {
	coe_rejected : ['Total Audited', 'Rejected'],
	coe_on_hold  : ['Total Audited', 'On Hold'],
};

const TITLE_MAPPING = {
	coe_rejected : 'Rejection Reason',
	coe_on_hold  : 'On Hold Reason',
};

function RejectedCharts({ subActiveTabReject = '', setFilters = () => {} }) {
	const [date, setDate] = useState(null);

	const [remarkDate, setRemarkDate] = useState(null);

	const PRESENT_MONTH = getMonth(new Date());
	const PRESENT_YEAR = getYear(new Date());

	const FINANCIAL_YEAR_START_DATE = `${PRESENT_MONTH < APRIL_MONTH_INDEX
		? PRESENT_YEAR - BEFORE_APRIL : PRESENT_YEAR}-04-01`;

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
				Rejected        : filteredStatusCount || DEFAULT_VALUE,
				'Total Audited' : auditedCount || DEFAULT_VALUE,
				'On Hold'       : filteredStatusCount || DEFAULT_VALUE,
			}
		);
	});

	const handleBarChartOnClick = (value) => {
		if (['Rejected', 'On Hold'].includes(value?.id)) {
			setFilters((pre) => ({
				...pre,
				updatedDateFrom       : undefined,
				updatedDateTo         : undefined,
				rejectionRemarksType  : undefined,
				statusUpdatedDateFrom : value?.indexValue,
				statusUpdatedDateTo   : value?.indexValue,
			}));
		}
	};

	const handlePieChartOnClick = (value) => {
		setFilters((pre) => ({
			...pre,
			statusUpdatedDateFrom : undefined,
			statusUpdatedDateTo   : undefined,
			updatedDateFrom       : remarkDate?.startDate
				? format(remarkDate?.startDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'])
				: FINANCIAL_YEAR_START_DATE,
			updatedDateTo        : format(remarkDate?.endDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']),
			rejectionRemarksType : value?.data?.key,
		}));
	};

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<div className={styles.container}>
			<div className={styles.responsive_bar_chart}>
				<div className={styles.text_filters_gap}>
					<div className={styles.text_style}>
						{`Total ${subActiveTabReject === 'coe_rejected' ? 'Rejected' : 'Hold'}`}
						<div className={styles.border} />
					</div>

					<div className={styles.icon}>
						<Tooltip
							content={(
								<div className={styles.text_styles}>
									Showing rejection/on-hold of pre-payment
									<br />
									audit on daily basis
									<br />
									Bucketing of reasons for rejection/on-hold of
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
						keys={TOTAL_REJECTED_KEY_MAPPING[subActiveTabReject]}
						handleBarChartOnClick={handleBarChartOnClick}
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
						title={TITLE_MAPPING[subActiveTabReject]}
						subActiveTabReject={subActiveTabReject}
						remarkDate={remarkDate}
						setRemarkDate={setRemarkDate}
						handlePieChartOnClick={handlePieChartOnClick}
					/>
				)}

			</div>
		</div>

	);
}
export default memo(RejectedCharts);
