import { isEmpty } from '@cogoport/utils';

import useGetShipmentInvoice from '../../hooks/useGetShipmentInvoice';
import useListSageSalesInvoices from '../../hooks/useListSageSalesInvoices';
import OverviewManageServices from '../Overview/OverviewManageServices';

import Loader from './commons/Loader';
import Invoices from './Invoices';
import styles from './styles.module.css';

function SalesInvoice() {
	const { list } = useListSageSalesInvoices();
	const { data: invoiceData, groupedInvoices, refetch: salesInvoicesRefetch, loading } = useGetShipmentInvoice();

	const isIRNGenerated = !!list.find((item) => !!item?.irn_number);

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader />
				<Loader />
				<Loader />
			</div>
		);
	}

	return (
		<main className={styles.container}>
			<OverviewManageServices isOpen={false} />

			{!loading && !isEmpty(invoiceData) ? (
				<Invoices
					invoiceData={invoiceData}
					groupedInvoices={groupedInvoices}
					loading={loading}
					salesInvoicesRefetch={salesInvoicesRefetch}
					isIRNGenerated={isIRNGenerated}
				/>
			) : null}
		</main>
	);
}

export default SalesInvoice;
