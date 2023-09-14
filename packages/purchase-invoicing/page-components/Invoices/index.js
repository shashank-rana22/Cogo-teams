import useListBfSalesInvoices from '../../hooks/useListBfSalesInvoices';

import InvoiceItem from './InvoiceItem';

function Invoices({
	invoiceDataCE = {},
	groupedInvoicesCE = {},
	loadingCE = false,
	shipmentData = {},
	salesInvoicesRefetch = () => {},
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
					invoiceData={invoiceDataCE}
					invoicesList={invoicesList}
					bfInvoiceRefetch={bfInvoiceRefetch}
					salesInvoicesRefetch={salesInvoicesRefetch} // rename also check all props are being used
					isCrossEntity
				/>
			))}
		</section>

	);
}

export default Invoices;
