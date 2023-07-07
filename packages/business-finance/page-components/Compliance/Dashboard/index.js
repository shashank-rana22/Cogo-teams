import { Placeholder, Select } from '@cogoport/components';
import { IcMActivePlans, IcMFileUploader, IcMInvoiceTriggers } from '@cogoport/icons-react';
import { useState } from 'react';

import useDashboard from '../hooks/useDashboard';
import { lastThreeFinancialYears } from '../Register/Outward/helper';

import styles from './styles.module.css';

const GET_ZERO_INDEX = 0;

function Dashboard() {
	const [year, setYear] = useState('');
	const { data, loading } = useDashboard(year, lastThreeFinancialYears);
	const {
		totalUploaded,
		fullMatchTotal,
		erroredOutTotal,
	} = data || {};

	const getInvoiceData = [
		{
			label : 'Total Invoices Uploaded',
			value : totalUploaded || '0',
			icon  : <IcMFileUploader height="25px" width="25px" />,
		},
		{
			label : 'Total Errored Out Uploaded',
			value : erroredOutTotal || '0',
			icon  : <IcMInvoiceTriggers height="25px" width="25px" />,
		},
		{ label: 'Full Match', value: fullMatchTotal || '0', icon: <IcMActivePlans height="25px" width="25px" /> },
	];

	return (
		<div>
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
			<div className={styles.container}>
				{getInvoiceData.map((item) => (
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
	);
}
export default Dashboard;
