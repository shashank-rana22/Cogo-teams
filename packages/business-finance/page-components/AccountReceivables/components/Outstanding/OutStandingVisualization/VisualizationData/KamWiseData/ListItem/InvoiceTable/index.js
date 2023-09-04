import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import invoiceTable from '../../../../../../../configs/invoice_table';
import useListOutstandingInvoices from '../../../../../../../hooks/useListOutstandingInvoices';
import EmptyStateOutStanding from '../../../../../EmptyStateOutStanding';

import InvoiceFilters from './InvoiceFilters';

function InvoiceTable({
	registrationNumber = '',
	cogoEntityValue = [],
	ageingArr,
	selectedBarData = {},
	filterValues = {},
	barData = [],
	path = '',
}) {
	const {
		loading,
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
				{isEmpty(data?.list) && !loading ? (
					<EmptyStateOutStanding />
				) : (
					<Table columns={invoiceTable()} data={data?.list || []} loading={loading} />
				)}
			</div>
		</div>
	);
}

export default InvoiceTable;
