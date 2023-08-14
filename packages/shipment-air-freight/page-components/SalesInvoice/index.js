import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import ManageServices from '../../commons/ManageServices';
import useGetShipmentInvoice from '../../hooks/useGetShipmentInvoice';
import useListSageSalesInvoices from '../../hooks/useListSageSalesInvoices';

import Invoices from './Invoices';
import styles from './styles.module.css';

function SalesInvoice() {
	const { list } = useListSageSalesInvoices();
	const { data: invoiceData, groupedInvoices, refetch: salesInvoicesRefetch, loading } = useGetShipmentInvoice();

	const isIRNGenerated = !!list?.find((item) => !!item?.irn_number);

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		);
	}

	return (
		<main className={styles.container}>
			<ManageServices />

			{(!loading && !isEmpty(invoiceData)) && (
				<Invoices
					invoiceData={invoiceData}
					groupedInvoices={groupedInvoices}
					loading={loading}
					salesInvoicesRefetch={salesInvoicesRefetch}
					isIRNGenerated={isIRNGenerated}
				/>
			)}
		</main>
	);
}

export default SalesInvoice;
