import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';

import useGetShipmentInvoice from '../../hooks/useGetShipmentInvoice';
import useListSageSalesInvoices from '../../hooks/useListSageSalesInvoices';
import OverviewManageServices from '../Overview/OverviewManageServices';

import Invoices from './Invoices';
import styles from './styles.module.css';

function SalesInvoice() {
	const { list } = useListSageSalesInvoices();

	const { data: invoiceData, groupedInvoices, refetch: salesInvoicesRefetch, loading } = useGetShipmentInvoice();

	const isIRNGenerated = !!list?.find((item) => !!item?.irn_number);

	if (loading) {
		return (
			<div className={styles.loader}>
				<ThreeDotLoader message="Loading Invoices" size={40} fontSize={18} />
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
