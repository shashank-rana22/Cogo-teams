import { Input } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React from 'react';

import Filter from '../../../../commons/Filters/index.tsx';
import List from '../../../../commons/List/index.tsx';
import { RenderAction } from '../../../Invoices/InvoiceTable/RenderFunctions/RenderAction';
import { RenderInvoiceDates } from '../../../Invoices/InvoiceTable/RenderFunctions/RenderInvoiceDates';
import { RenderToolTip } from '../../../Invoices/InvoiceTable/RenderFunctions/RenderToolTip';
import { RenderUrgency } from '../../../Invoices/InvoiceTable/RenderFunctions/RenderUrgency';
import { ALL_INVOICE_CONFIG } from '../../../Invoices/InvoiceTable/tableconfigurations/allInvoiceConfig';
import FilterModal from '../../../Invoices/MoreFilters';

import styles from './styles.module.css';

const FIRST_PAGE = 1;
const DEFAULT_FILTER_LEN = 4;

export const invoiceFilters = [
	{
		name        : 'invoiceView',
		span        : 1,
		type        : 'select',
		placeholder : 'Invoice View',
		options     : [
			{ label: 'All', value: 'all' },
			{ label: 'Migrated', value: 'migrated' },
			{ label: 'COE Accepted', value: 'coe_accepted' },
		],
	},
];

function Invoices({
	billsData = {},
	billsLoading = false,
	billsFilters = {},
	setBillsFilters = () => {},
	orderBy = {},
	setOrderBy = () => {},
}) {
	const functions = {
		renderToolTip: (itemData, field) => (
			<RenderToolTip itemData={itemData} field={field} />
		),
		renderInvoiceDates: (itemData, field) => (
			<RenderInvoiceDates itemData={itemData} field={field} />
		),
		renderUrgencyTag: (itemData, field) => (
			<RenderUrgency itemData={itemData} field={field} />
		),
		renderAction: (itemData) => (
			<RenderAction itemData={itemData} />
		),
	};

	return (
		<div>

			<div className={styles.filters}>
				<div className={styles.filtercontainer}>
					<Filter controls={invoiceFilters} filters={billsFilters} setFilters={setBillsFilters} />
					<FilterModal filters={billsFilters} setFilters={setBillsFilters} filterlen={DEFAULT_FILTER_LEN} />
				</div>
				<div className={styles.search_filter}>
					<div className={styles.search}>
						<Input
							name="search"
							size="sm"
							value={billsFilters?.search || ''}
							onChange={(val) => setBillsFilters((p) => ({ ...p, search: val, pageIndex: 1 }))}
							placeholder="Search By Name/Invoice Number/Sid"
							suffix={(
								<div style={{ margin: '4px', display: 'flex' }}>
									<IcMSearchdark height={15} width={15} />
								</div>
							)}
						/>
					</div>
				</div>
			</div>
			<div className={styles.list_container}>
				<List
					itemData={billsData}
					loading={billsLoading}
					config={ALL_INVOICE_CONFIG}
					functions={functions}
					sort={orderBy}
					setSort={setOrderBy}
					page={billsFilters?.pageIndex || FIRST_PAGE}
					pageSize={10}
					handlePageChange={(val) => setBillsFilters({
						...billsFilters,
						pageIndex: val,
					})}
					rowStyle="border"
					showPagination
					paginationType="number"
				/>
			</div>
		</div>
	);
}

export default Invoices;
