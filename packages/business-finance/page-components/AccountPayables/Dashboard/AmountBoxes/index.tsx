import { Tooltip } from '@cogoport/components';
import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import useGetInvoiceAmount from '../hooks/useGetInvoiceAmount';
import { getAmountInLakhCrK } from '../utils/getAmountInLakhCrK';

import styles from './styles.module.css';

function AmountBoxes() {
	const {
		data,
		// loading,
		// getDahboardData,
	} = useGetInvoiceAmount();
	const {
		accountPayables,
		onAccountAmount,
		openInvoicesAmount,
		openInvoicesCount,
		organizationsCount,
	} = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={styles.box}>
					<div className={styles.sub_container}>
						<div className={styles.label_text}>
							INR
						</div>
						<div className={styles.value_text}>

							<Tooltip
								content={getFormattedPrice(accountPayables, 'INR') || ''}
								placement="top"
								interactive
							>
								{getAmountInLakhCrK(accountPayables)}
							</Tooltip>
						</div>
						<div className={styles.vr} />
						<div className={styles.account_payables}>
							<div className={styles.label_text}>
								Account Payables
							</div>
							<div className={styles.invoices_org}>
								Open Invoices -
								{' '}
								{openInvoicesCount}
								{' '}
								| Organizations -
								{' '}
								{organizationsCount}
							</div>
						</div>
					</div>

				</div>
				<div className={styles.box}>
					<div className={styles.sub_container}>
						<div className={styles.label_text}>
							INR
						</div>
						<div className={styles.value_text}>
							{getAmountInLakhCrK(openInvoicesAmount)}
						</div>
						<div className={styles.account_payables}>
							<div className={styles.label_text}>
								Open Invoices
							</div>
							<div className={styles.percentage_text}>
								<div className={styles.profit_icon}>
									<IcMArrowNext height={20} width={20} />
								</div>
								+ 1.01% this week
							</div>
						</div>
					</div>
				</div>
				<div className={styles.box}>
					<div className={styles.sub_container}>
						<div className={styles.label_text}>
							INR
						</div>
						<div className={styles.value_text}>
							{getAmountInLakhCrK(onAccountAmount)}
						</div>
						<div className={styles.account_payables}>
							<div className={styles.label_text}>
								On Account Payment
							</div>
							<div className={styles.percentage_text}>
								<div className={styles.profit_icon}>
									<IcMArrowNext height={20} width={20} />
								</div>
								+ 1.01% this week
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AmountBoxes;
