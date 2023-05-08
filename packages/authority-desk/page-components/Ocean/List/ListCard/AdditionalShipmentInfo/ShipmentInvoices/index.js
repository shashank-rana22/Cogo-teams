import { Loader, Pagination } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase, format, upperCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../../../commons/EmptyState';
import useListInvoiceWrapper from '../../../../../../hooks/useListInvoiceWrapper';

import styles from './styles.module.css';

function ShipmentInvoices({ item = {} }) {
	const [page, setPage] = useState(1);

	const { data, loading } = useListInvoiceWrapper({ serial_id: item?.serial_id, page });

	const renderPagination = (
		data?.totalRecords > 10 && !loading ? (
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

	if (data?.list?.length === 0 && !loading) {
		return <EmptyState />;
	}

	if (loading) {
		return 	(
			<div className={styles.loader}>
				Loading Invoices Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	return (
		<div className={styles.container}>

			{renderPagination}

			<table>
				<thead>
					<tr className={styles.row}>
						<th>Invoice Number</th>
						<th>Type </th>
						<th>Invoice Value</th>
						<th> Balance Amount</th>
						<th>Due Date</th>
						<th>Payment Status </th>
					</tr>
				</thead>
				<tbody>

					{(data?.list || []).map((val) => (
						<tr className={styles.row}>
							<td
								role="presentation"
								onClick={() => {
									window.open(
										val?.status !== 'DRAFT'
											? val?.invoicePdfUrl
											: val?.proformaPdfUrl,
										'_blank',
									);
								}}
							>
								{val?.status !== 'DRAFT' ? val?.invoiceNumber : val?.proformaNumber}

							</td>
							<td>
								{startCase(val?.invoiceType)}
								{' '}
							</td>
							<td>
								{formatAmount({
									amount   : val?.grandTotal,
									currency : val?.currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								}) }

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
							<td>{format(val?.dueDate, 'dd MM yyyy', null, true)}</td>
							<td>{upperCase(val?.paymentStatus)}</td>
						</tr>
					))}
				</tbody>

			</table>
		</div>
	);
}

export default ShipmentInvoices;
