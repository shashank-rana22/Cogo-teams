import { Placeholder, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import useGetInvoiceAmount from '../hooks/useGetInvoiceAmount';

import styles from './styles.module.css';

function AmountBoxes({ activeEntity }) {
	const {
		data,
		loading,
	} = useGetInvoiceAmount({ activeEntity });
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
		currency,
	} = data || {};

	const MAPPING_DATA = [
		{
			label  : 'Open Invoices',
			amount : openInvoicesAmount,
			count  : openInvoiceChange,
		}, {
			label  : 'On Account Payment',
			amount : onAccountAmount,
			count  : onAccountChange,
		},
		{
			label  : 'Open Credit Notes',
			amount : creditNoteAmount,
			count  : creditNoteChange,
		},

	];

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={styles.box}>
					{loading ? <Placeholder className={styles.loader} />
						: (
							<div className={styles.sub_container}>

								<div className={styles.value_text}>

									<Tooltip
										content={formatAmount({
											amount  : accountPayables,
											currency,
											options : {
												currencyDisplay : 'code',
												style           : 'currency',

											},
										}) || ''}
										placement="top"
										interactive
									>
										<div>
											{formatAmount({
												amount  : accountPayables,
												currency,
												options : {
													currencyDisplay       : 'code',
													style                 : 'currency',
													notation              : 'compact',
													compactDisplay        : 'short',
													minimumFractionDigits : 2,
													currencyWise          : true,
												},
											})}
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
									</div>
									<div className={styles.invoices_org}>
										Organizations -
										{' '}
										{organizationsCount}
									</div>
								</div>
							</div>
						)}
				</div>

				{MAPPING_DATA.map((item) => (
					<div className={styles.box} key={item}>
						{loading ? <Placeholder className={styles.loader} />
							: (
								<div className={styles.sub_container}>

									<div className={styles.value_text}>
										<Tooltip
											content={formatAmount({
												amount  : item?.amount,
												currency,
												options : {
													currencyDisplay : 'code',
													style           : 'currency',

												},
											}) || ''}
											placement="top"
											interactive
										>
											<div>
												{
													formatAmount({
														amount  : item?.amount,
														currency,
														options : {
															currencyDisplay       : 'code',
															style                 : 'currency',
															notation              : 'compact',
															compactDisplay        : 'short',
															minimumFractionDigits : 2,
															currencyWise          : true,
														},
													})
												}
											</div>
										</Tooltip>
									</div>
									<div className={styles.account_payables}>
										<div className={styles.label_text}>
											{item.label}
										</div>
										<div className={styles.percentage_text}>
											<div className={item?.count > 0
												? styles.profit_icon : styles.loss_icon}
											>
												<IcMArrowNext height={20} width={20} />
											</div>
											{ item.count > 0 ? '+' : null}
											{' '}
											{item.count?.toFixed(2)}
											% this week
										</div>
									</div>
								</div>
							)}
					</div>
				))}
			</div>
		</div>
	);
}

export default AmountBoxes;
