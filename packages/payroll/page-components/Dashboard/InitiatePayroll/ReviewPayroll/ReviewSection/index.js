import { Pill } from '@cogoport/components';
import { IcMDummyCircle } from '@cogoport/icons-react';
import { getDate, getMonth } from '@cogoport/utils';
import React from 'react';

import { MONTHS } from '../../../../../utils/constants';

import styles from './styles.module.css';

const STEP_NO = 3;
const DESGIN_IMAGE = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/payroll_design1.svg';
function Review({ payroll_data = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.head_section}>
				<div className={styles.head_text_section}>
					<span className={styles.section_heading}>Review Payroll</span>
					<span className={styles.sub_heading_section}>
						Please spend a brief moment reviewing the numbers
					</span>
				</div>
				<div>
					<Pill size="xl" className={styles.step_view_btn} suffix={<IcMDummyCircle />}>
						Step
						{' '}
						{STEP_NO}
						/3
						{' '}
					</Pill>
				</div>
			</div>

			<div className={styles.total_amount_section}>
				<div className={styles.head_text_section2}>
					<span className={styles.section2_heading}>Total Payroll Amount</span>
					<span className={styles.sub_heading_section2}>
						₹
						{' '}
						{payroll_data?.total_net_payout}
					</span>
					<span className={styles.sub_heading2_section2}>
						{payroll_data?.employee_count}
						{' '}
						employees will be paid by
						{' '}
						{getDate(new Date(payroll_data.payroll_month))}
						{' '}
						{MONTHS[(getMonth(new Date(payroll_data.payroll_month)) + 1) % 12]}
					</span>
				</div>
				<div className={styles.image_section}>
					<img
						src={DESGIN_IMAGE}
						alt="design-payroll"
					/>
				</div>

			</div>
		</div>

	);
}

export default Review;
