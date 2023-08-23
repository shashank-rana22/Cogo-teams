import useListShipmentInvoiceCombinations from '../../../../hooks/useListShipmentInvoiceCombinations';

function Invoice({ listFilters = {} }) {
	useListShipmentInvoiceCombinations({ defaultFilters: listFilters });
	// console.log({ data });

	return <div>Invoice</div>;
}

export default Invoice;
