import { SingleDateRange, Button, Select } from '@cogoport/components';
import React, { useState } from 'react';

import { REPORTTYPEOPTIONS } from './constants/REPORTTYPEOPTIONS';
import useSubmitReport from './hooks/useSubmitReport';
import styles from './styles.module.css';

function Reports() {
	const [value, setValue] = useState({
		reportType : null,
		dateRange  : null,
	});

	const { api, loading } = useSubmitReport(value);

	const onChange = (e) => {
		setValue((p) => ({ ...p, reportType: e }));
	};

	const handleSubmit = () => {
		api();
	};

	return (
		<div>
			<h1>Reports</h1>
			<div className={styles.line} />
			<div className={styles.flex}>
				<div>
					<div className={styles.title}>Report Type*</div>
					<div className={styles.input}>
						<Select
							value={value.reportType}
							onChange={(e) => onChange(e)}
							placeholder="Select Report Type"
							options={REPORTTYPEOPTIONS}
						/>
					</div>
				</div>
				<div>
					<div className={styles.title}>Select Date Range*</div>
					<div className={styles.date}>
						<SingleDateRange
							placeholder="Enter Date Range"
							dateFormat="yyyy-MM-dd"
							name="date"
							onChange={(e) => setValue((p) => ({ ...p, dateRange: e }))}
							value={value.dateRange}
						/>
					</div>
				</div>

				<div className={styles.button}>
					<Button
						className={styles.buttonClass}
						disabled={loading
							|| !value.reportType || !value.dateRange?.startDate || !value.dateRange?.endDate}
						onClick={handleSubmit}
						size="md"
					>
						Submit
					</Button>
				</div>
			</div>

		</div>
	);
}

export default Reports;
