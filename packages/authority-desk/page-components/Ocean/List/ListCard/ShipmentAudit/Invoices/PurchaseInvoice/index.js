import { Loader } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { format, upperCase, startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../../../commons/EmptyState';
import useGetBill from '../../../../../../../hooks/useGetBill';

import styles from './styles.module.css';

function PurchaseInvoice({ item }) {
	const { data, loadingBills } = useGetBill({ serial_id: item?.serial_id });

	if (loadingBills) {
		return (
			<div className={styles.loader}>
				Loading Invoice Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	if (data?.list?.length === 0 && !loadingBills) {
		return <EmptyState />;
	}
	return (
		<div className={styles.container}>
			<table>
				<thead>
					<tr>
						<td>Invoice Number</td>
						<td>Type</td>
						<td>Invoice Value</td>
						<td>Status</td>
						<td>Balance Amount</td>
						<td>Due Date</td>
						<td>Paid Amount</td>
						<td>Payment Status</td>
					</tr>
				</thead>

				<tbody>
					{(data?.list || []).map((val) => (
						<tr key={val.id}>
							<td
								role="presentation"
								onClick={() => {
									window.open(
										val?.status !== 'DRAFT' ? val?.billPdfUrl : val?.proformaPdfUrl,
										'_blank',
									);
								}}
							>
								{val?.status !== 'DRAFT' ? val?.billNumber : val?.proformaNumber}

							</td>
							<td>
								{startCase(val?.billType)}
							</td>
							<td>
								{formatAmount({
									amount   : val?.grandTotal,
									currency : val?.billCurrency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})}

							</td>
							<td>
								{startCase(val?.status)}
							</td>
							<td>
								{formatAmount({
									amount   : val.grandTotal - val.paidAmount - val.paidTds,
									currency : val?.billCurrency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})}

							</td>
							<td>{ format(val?.dueDate, 'dd MMM yyyy', null, true)}</td>
							<td>
								{formatAmount({
									amount   : val?.paidAmount,
									currency : val?.billCurrency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})}

							</td>
							<td>{upperCase(val?.paymentStatus)}</td>
						</tr>
					))}
				</tbody>
			</table>

		</div>
	);
}

export default PurchaseInvoice;
