import { Loader, Pagination } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase, format, upperCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../../../../commons/EmptyState';
import useListInvoiceWrapper from '../../../../../../../hooks/useListInvoiceWrapper';

import styles from './styles.module.css';

function OrgDetails({ registerationNumber = '' }) {
	const [page, setPage] = useState(1);

	const { data, loading } = useListInvoiceWrapper({ registerationNumber, page });

	if (loading) {
		return (
			<div className={styles.loader}>
				Loading Invoices Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	if (data?.list?.length === 0 && !loading) {
		return <EmptyState />;
	}

	const renderPagination = (
		data?.totalRecords < 10 && !loading ? (
			<Pagination
				type="table"
				totalItems={data?.totalRecords}
				pageSize={10}
				currentPage={page}
				className={styles.pagination}
				onPageChange={(val) => setPage(val)}
			/>
		) : null
	);

	return (
		<div className={styles.container}>

			{ renderPagination}

			<table>
				<th>
					<td>
						Invoice Number
					</td>
					<td>
						Type
					</td>
					<td> Invoice Value</td>
					<td> Paid Amount</td>
					<td> Balance Amount</td>
					<td> Due Date</td>
					<td>Payment Status</td>
				</th>
				{(data?.list || []).map((val) => (
					<tr key={val.id}>
						<td>{val?.invoiceNumber || val?.proformaNumber}</td>
						<td>
							{startCase(val?.invoiceType)}
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
							{' '}

						</td>
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

						<td>
							{formatAmount({
								amount   : val?.balanceAmount,
								currency : val?.currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}

						</td>
						<td>{format(val?.dueDate, 'dd MMM yyyy', null, true)}</td>
						<td>{upperCase(val?.paymentStatus)}</td>
					</tr>
				))}
			</table>

		</div>
	);
}

export default OrgDetails;
