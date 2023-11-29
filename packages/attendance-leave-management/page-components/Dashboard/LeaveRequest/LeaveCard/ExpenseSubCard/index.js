import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcMMoney,
} from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ExpenseSubCard({ val = {}, isManager = false }) {
	const router = useRouter();
	return (
		<div className={styles.details} key={val.id}>
			<div className={styles.design}>
				<div className={styles.img}>
					<IcMMoney width={18} height={18} />
				</div>
				<div className={styles.sec2}>
					<div className={styles.text1}>
						<span className={styles.text_name}>{val.name}</span>
						{' '}
						raised a expense request on ,
						{formatDate({
							date       : val?.submitted_on ? new Date(val?.submitted_on) : null,
							dateFormat : GLOBAL_CONSTANTS.formats.date['MMM dd yyyy'],
							formatType : 'date',
						})}
					</div>
					<div className={styles.text2}>
						Category :
						{' '}
						{val.category}
					</div>
					<div className={styles.text2}>
						Amount :
						{' '}
						{val.amount}
					</div>
				</div>
			</div>
			{isManager ? (
				<div className={styles.yes_no}>
					<div className={styles.approve}>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => router.push(`/payment?search_query=${encodeURIComponent(val?.name)}`)}
						>
							<div className={styles.accept}>
								<span className={styles.acc_content}>View Expense</span>
							</div>
						</Button>
					</div>
				</div>
			) : (
				<div
					className={`${styles[val.reimbursement_status === 'pending' ? 'pending' : 'accepted']}`}
				>
					{startCase(val.reimbursement_status)}
				</div>
			)}
		</div>
	);
}

export default ExpenseSubCard;
