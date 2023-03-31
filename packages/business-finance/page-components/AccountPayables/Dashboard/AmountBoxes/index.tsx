import { Placeholder, Tooltip } from '@cogoport/components';
import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import useGetInvoiceAmount from '../hooks/useGetInvoiceAmount';
import { getAmountInLakhCrK } from '../utils/getAmountInLakhCrK';

import styles from './styles.module.css';

function AmountBoxes() {
	const {
		data,
		loading,
	} = useGetInvoiceAmount();
	const {
		accountPayables,
		onAccountAmount,
		openInvoicesAmount,
		openInvoicesCount,
		organizationsCount,
		openInvoiceChange,
		onAccountChange,
		creditNoteAmount,
		creditNoteChange,
	} = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={styles.box}>
					{loading ? <Placeholder height="20px" width="300px" margin="0px 0px 26px 0px" />
						: (
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
										<div>
											{getAmountInLakhCrK(accountPayables)}
										</div>
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
						)}
				</div>
				<div className={styles.box}>
					{loading ? <Placeholder height="20px" width="300px" margin="0px 0px 26px 0px" />
						: (
							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									INR
								</div>
								<div className={styles.value_text}>
									<Tooltip
										content={getFormattedPrice(openInvoicesAmount, 'INR') || ''}
										placement="top"
										interactive
									>
										<div>
											{getAmountInLakhCrK(openInvoicesAmount)}
										</div>
									</Tooltip>
								</div>
								<div className={styles.account_payables}>
									<div className={styles.label_text}>
										Open Invoices
									</div>
									<div className={styles.percentage_text}>
										<div className={openInvoiceChange > 0 ? styles.profit_icon : styles.loss_icon}>
											<IcMArrowNext height={20} width={20} />
										</div>
										{ openInvoiceChange > 0 ? '+' : null}
										{' '}
										{openInvoiceChange?.toFixed(2)}
										% this week
									</div>
								</div>
							</div>
						)}
				</div>
				<div className={styles.box}>
					{loading
						? <Placeholder height="20px" width="300px" margin="0px 0px 26px 0px" />
						: (
							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									INR
								</div>
								<div className={styles.value_text}>
									<Tooltip
										content={getFormattedPrice(onAccountAmount, 'INR') || ''}
										placement="top"
										interactive
									>
										<div>
											{getAmountInLakhCrK(onAccountAmount)}
										</div>
									</Tooltip>
								</div>
								<div className={styles.account_payables}>
									<div className={styles.label_text}>
										On Account Payment
									</div>
									<div className={styles.percentage_text}>
										<div className={onAccountChange > 0 ? styles.profit_icon : styles.loss_icon}>
											<IcMArrowNext height={20} width={20} />
										</div>
										{ onAccountChange > 0 ? '+' : null}
										{' '}
										{onAccountChange?.toFixed(2)}
										% this week
									</div>
								</div>
							</div>
						)}
				</div>
				<div className={styles.box}>
					{loading ? <Placeholder height="20px" width="300px" margin="0px 0px 26px 0px" />
						: (
							<div className={styles.sub_container}>
								<div className={styles.label_text}>
									INR
								</div>
								<div className={styles.value_text}>
									<Tooltip
										content={getFormattedPrice(creditNoteAmount, 'INR') || ''}
										placement="top"
										interactive
									>
										<div>
											{getAmountInLakhCrK(creditNoteAmount)}
										</div>
									</Tooltip>
								</div>
								<div className={styles.account_payables}>
									<div className={styles.label_text}>
										Open Credit Notes
									</div>
									<div className={styles.percentage_text}>
										<div className={creditNoteChange > 0 ? styles.profit_icon : styles.loss_icon}>
											<IcMArrowNext height={20} width={20} />
										</div>
										{ creditNoteChange > 0 ? '+' : null}
										{' '}
										{creditNoteChange?.toFixed(2)}
										% this week
									</div>
								</div>
							</div>
						)}
				</div>
			</div>
		</div>
	);
}

export default AmountBoxes;
