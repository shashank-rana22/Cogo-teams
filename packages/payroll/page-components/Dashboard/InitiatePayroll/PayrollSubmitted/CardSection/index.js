import { IcCFtick } from '@cogoport/icons-react';
import { getDate, getMonth, getYear } from '@cogoport/utils';
import React from 'react';

import { CARDDATAPAYROLL, MONTHS } from '../../../../../utils/constants';

import PayCard from './PayCard';
import styles from './styles.module.css';

function getformatDate(date) {
	return date
		? `${`${MONTHS[getMonth(new Date(date))]} ${getDate(new Date(date))}`}, ${getYear(new Date(date))}` : '-';
}

function SubmitPayroll({ payroll_data = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.head_section}>
				<div>
					<IcCFtick width={22} height={22} />

				</div>
				<div className={styles.head_text_section}>
					<span className={styles.section_heading}>Payroll Submitted Successfully</span>
					<span className={styles.sub_heading_section}>
						The finance department is notified about the payments to be made
					</span>
				</div>

			</div>

			<div className={styles.cards_section}>
				{
					CARDDATAPAYROLL.map((item) => (
						<PayCard title={`₹ ${payroll_data[item.title]}`} subtitle={item.subtitle} key={item.title} />
					))
				}
				<PayCard
					title={getformatDate(payroll_data.approved_on)}
					subtitle="Payroll Submission Date"
					key={payroll_data.approved_on}
				/>
				<PayCard
					title={getformatDate(payroll_data.processed_on)}
					subtitle="Payment Date"
					key={payroll_data.processed_on}
				/>
			</div>

		</div>

	);
}

export default SubmitPayroll;
