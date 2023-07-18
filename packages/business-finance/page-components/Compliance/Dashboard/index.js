import { Placeholder, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useState } from 'react';

import useDashboard from '../hooks/useDashboard';
import { lastThreeFinancialYears } from '../Register/Outward/helper';

import { COLORS, dataValue, getInvoiceData } from './constant';
import PieData from './PieData';
import styles from './styles.module.css';

const GET_ZERO_INDEX = 0;

function Dashboard() {
	const [year, setYear] = useState('');
	const {
		data, loading, Gstr1Data,
		LoadingGstr1,
	} = useDashboard(year, lastThreeFinancialYears);
	const {
		totalUploaded,
		fullMatchTotal,
		erroredOutTotal,
	} = data || {};

	const { filedCount, totalCount, lastFiledDate, dueDate } = Gstr1Data || {};

	const remainCount = totalCount - filedCount;

	return (
		<div>
			<div className={styles.container_return}>
				<div>Returns Status</div>
				<div className={styles.return_label} />
				<div className={styles.card_return}>
					<div className={styles.gstr1_label}>GSTR-1</div>
					<div className={styles.pie_chart_value}>
						<PieData
							data={dataValue(filedCount, remainCount)}
							COLORS={COLORS}
							filedCount={filedCount}
							LoadingGstr1={LoadingGstr1}
						/>
						<div className={styles.data_show}>
							Out of
							{' '}
							{LoadingGstr1 ? <Placeholder height="15px" width="80px" /> : totalCount}
						</div>
					</div>
					<div className={styles.date_data}>
						<div className={styles.data_show}>
							<span className={styles.date_label}>Last Filed on :</span>
							{' '}
							<span className={styles.date_show}>
								{LoadingGstr1 ? <Placeholder height="15px" width="80px" /> : formatDate({
									date       : lastFiledDate,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}

							</span>
						</div>
						<div className={styles.data_show}>
							<span className={styles.date_label}> Due Date :</span>
							{' '}
							<span className={styles.date_due_show}>
								{' '}
								{ LoadingGstr1 ? <Placeholder height="15px" width="80px" /> : formatDate({
									date       : dueDate,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}

							</span>
						</div>
					</div>

				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.select_container}>
					<Select
						value={year || lastThreeFinancialYears?.[GET_ZERO_INDEX]?.value}
						onChange={(val) => { setYear(val); }}
						placeholder="Financial Year"
						options={lastThreeFinancialYears}
						isClearable
						style={{ width: '200px' }}
						size="sm"
					/>
				</div>
				<div className={styles.invoice_show_data}>
					{getInvoiceData(totalUploaded, erroredOutTotal, fullMatchTotal).map((item) => (
						<div key={item?.label} className={styles.invoice_data}>
							<div className={styles.label_value}>
								<div className={styles.icon}>{item?.icon}</div>
								<div>{item?.label}</div>
							</div>

							<div className={styles.number}>
								{loading ? <Placeholder height="40px" width="30px" />
									: item?.value}

							</div>
						</div>
					))}
				</div>

			</div>
		</div>
	);
}
export default Dashboard;
