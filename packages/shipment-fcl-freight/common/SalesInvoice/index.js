import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';

import useGetShipmentCrossEntityInvoice from '../../hooks/useGetShipmentCrossEntityInvoice';
import useGetShipmentInvoice from '../../hooks/useGetShipmentInvoice';
import useListSageSalesInvoices from '../../hooks/useListSageSalesInvoices';
import OverviewManageServices from '../Overview/OverviewManageServices';

import Invoices from './Invoices';
import styles from './styles.module.css';

function SalesInvoice() {
	const { list = [] } = useListSageSalesInvoices();

	const { data: invoiceData, groupedInvoices, refetch: salesInvoicesRefetch, loading } = useGetShipmentInvoice();

	const {
		data: invoiceDataCE = {},
		groupedInvoices:groupedInvoicesCE = {},
		loading:loadingCE = false,
	} = useGetShipmentCrossEntityInvoice();

	const isIRNGenerated = !!list?.find((item) => !!item?.irn_number);

	if (loading || loadingCE) {
		return (
			<div className={styles.loader}>
				<ThreeDotLoader message="Loading Invoices" size={40} fontSize={18} />
			</div>
		);
	}

	return (
		<main className={styles.container}>

			<OverviewManageServices isOpen={false} source="overview" />

			{!(loading || loadingCE) && !(isEmpty(invoiceData) && isEmpty(invoiceDataCE)) ? (

				<Invoices
					invoiceData={invoiceData}
					invoiceDataCE={invoiceDataCE}
					groupedInvoices={groupedInvoices}
					groupedInvoicesCE={groupedInvoicesCE}
					loading={loading}
					loadingCE={loadingCE}
					salesInvoicesRefetch={salesInvoicesRefetch}
					isIRNGenerated={isIRNGenerated}
				/>

			) : null}

		</main>
	);
}

export default SalesInvoice;
