import { Button } from '@cogoport/components';
import { useForm, SelectController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import React, { useState, useMemo, useEffect } from 'react';

import styles from './styles.module.css';

const MONTH_NAMES = [
	'January', 'February', 'March', 'April',
	'May', 'June', 'July', 'August',
	'September', 'October', 'November', 'December',
];

function Heading({
	employee_name = '', list = [],
	getEmployeePayrollDashboardGraph = () => {},
	getEmployeePayrollOverview = () => {},
}) {
	const router = useRouter();
	const month = new Date().getMonth();
	const monthString = MONTH_NAMES[month];
	const year = new Date().getFullYear();

	const [selectedMonth, setSelectedMonth] = useState('');

	const MONTH_OBJS = useMemo(() => {
		if (list) {
			return list.map((name) => ({ label: name, value: name }));
		}
		return [];
	}, [list]);

	const { control, setValue } = useForm();

	const handleMonthChange = (selectedValue) => {
		setSelectedMonth(selectedValue);
		getEmployeePayrollDashboardGraph({ payload: selectedValue });
		getEmployeePayrollOverview({ payload: selectedValue });
	};

	useEffect(() => {
		setValue('month_year', selectedMonth || list[GLOBAL_CONSTANTS.zeroth_index]);
	}, [setValue, selectedMonth, list]);

	return (
		<div className={styles.flex}>
			<div className={styles.top_text_container}>
				<span className={styles.top_bold_text}>
					Welcome back,
					{' '}
					{employee_name}
					!
				</span>
				<span className={styles.top_grey_text}>
					Let’s see your payments for
					{' '}
					{selectedMonth || `${monthString} ${year}`}
				</span>
			</div>
			<div className={styles.buttons_div}>
				<SelectController
					name="month_year"
					size="md"
					control={control}
					options={MONTH_OBJS}
					onChange={handleMonthChange}
				/>
				<Button
					size="lg"
					className={styles.header_button}
					themeType="secondary"
					onClick={() => router.push('/payroll/payroll?run=run_payroll')}
				>
					Run New Payroll

				</Button>
			</div>
		</div>

	);
}

export default Heading;
