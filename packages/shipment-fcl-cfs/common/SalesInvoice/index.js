import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';

import useGetShipmentInvoicePreference from '../../hooks/useGetShipmentInvoicePreference';
import useListSageInvoicesV2 from '../../hooks/useListSageInvoicesV2';
import OverviewManageServices from '../Overview/OverviewManageServices';

import Invoices from './Invoices';
import styles from './styles.module.css';

function SalesInvoice() {
	const { list } = useListSageInvoicesV2();
	const {
		data: invoiceData,
		groupedInvoices, refetch: salesInvoicesRefetch, loading,
	} = useGetShipmentInvoicePreference();

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
