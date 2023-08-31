import { Table } from '@cogoport/components';

import invoiceTable from '../../../../../../../configs/invoice_table';
import useListOutstandingInvoices from '../../../../../../../hooks/useListOutstandingInvoices';

import InvoiceFilters from './InvoiceFilters';

function InvoiceTable({
	registrationNumber,
	cogoEntityValue,
	// popoverLoading,
	// partnersMapping,
	// handleClick,
	ageingArr,
	selectedBarData,
	filterValues,
	barData,
	path,
}) {
	const {
		data,
		params,
		setParams,
		setSearchQuery,
		searchQuery,
		setInvoiceStatus,
		invoiceStatus,
	} = useListOutstandingInvoices({
		registrationNumber,
		cogoEntityValue,
		ageingArr,
		selectedBarData,
		filterValues,
		barGraphData: barData,
		path,
	});
	return (
		<div>
			<InvoiceFilters
				setSearchQuery={setSearchQuery}
				searchQuery={searchQuery}
				setParams={setParams}
				params={params}
				setInvoiceStatus={setInvoiceStatus}
				invoiceStatus={invoiceStatus}
			/>
			<div>
				<Table columns={invoiceTable()} data={data?.list || []} />
			</div>
		</div>
	);
}

export default InvoiceTable;
