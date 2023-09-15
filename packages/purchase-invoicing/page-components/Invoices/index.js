import useListBfSalesInvoices from '../../hooks/useListBfSalesInvoices';

import InvoiceItem from './InvoiceItem';

function Invoices({
	invoiceDataCE = {},
	groupedInvoicesCE = {},
	loadingCE = false,
	shipmentData = {},
	purchaseInvoicesRefetch = () => {},
}) {
	const {
		salesList : invoicesList,
		refetch: bfInvoiceRefetch,
	} = useListBfSalesInvoices({ serial_id: shipmentData?.serial_id });

	const totalsCE = invoiceDataCE?.invoicing_party_wise_total;

	return (
		<section>
			{Object.keys(groupedInvoicesCE || {}).map((item) => (
				<InvoiceItem
					key={item}
					item={groupedInvoicesCE[item]}
					total={totalsCE?.[item]}
					loading={loadingCE}
					invoicesList={invoicesList}
					bfInvoiceRefetch={bfInvoiceRefetch}
					purchaseInvoicesRefetch={purchaseInvoicesRefetch}
				/>
			))}
		</section>

	);
}

export default Invoices;
