import { Select, TabPanel, Tabs, Placeholder, Input } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../commons/Filters';
import List from '../../commons/List';
import EmptyState from '../../commons/StyledTable/EmptyState';

import { invoiceFilters } from './configurations';
import useGetBillsList from './hooks/useGetBillsList';
import { RenderAction } from './InvoiceTable/RenderFunctions/RenderAction';
import { RenderInvoiceDates } from './InvoiceTable/RenderFunctions/RenderInvoiceDates';
import { RenderToolTip } from './InvoiceTable/RenderFunctions/RenderToolTip';
import { RenderUrgency } from './InvoiceTable/RenderFunctions/RenderUrgency';
import { ALL_INVOICE_CONFIG } from './InvoiceTable/tableconfigurations/allInvoiceConfig';
import FilterModal from './MoreFilters';
import styles from './styles.module.css';
import TabStat from './TabStat';

const TABS = [
	{ label: 'All Invoices', value: 'all' },
	{ label: 'Today’s Payables', value: 'todays' },
	{ label: 'Delayed', value: 'delayed' },
	{ label: 'Disputed', value: 'disputed' },
	{ label: 'Not Due', value: 'notDue' },
];
function Invoices() {
	const [activeTab, setActiveTab] = useState('all');

	const {
		billsData,
		billsLoading,
		billsFilters,
		setBillsFilters,
		orderBy,
		setOrderBy,
	} = useGetBillsList({ activeTab });

	const { stats = {}, list = [], pageIndex } = billsData || {};

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
			<div className={styles.statscontainer}>
				{TABS.map(({ label, value }) => (<TabStat name={label} isActive={activeTab === value} value={value} number={stats?.[value]} setActiveTab={setActiveTab} />))}
			</div>
			<div className={styles.filters}>
				<div className={styles.filtercontainer}>
					<Filter controls={invoiceFilters} filters={billsFilters} setFilters={setBillsFilters} />
					<FilterModal filters={billsFilters} setFilters={setBillsFilters} activeTab={activeTab} />
				</div>
				<div className={styles.search_filter}>
					<div className={styles.search}>
						<Input
							name="search"
							size="sm"
							value={billsFilters?.search || ''}
							onChange={(val) => setBillsFilters((p) => ({ ...p, search: val }))}
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
				{(list?.length > 0) ? (
					<List
						itemData={billsData}
						loading={billsLoading}
						config={ALL_INVOICE_CONFIG}
						functions={functions}
						sort={orderBy}
						setSort={setOrderBy}
						page={billsFilters?.pageIndex || 1}
						pageSize={10}
						handlePageChange={(val) => setBillsFilters({
                            	...billsFilters,
                            	pageIndex: val,
						})}
						rowStyle="border"
						showPagination
						paginationType="number"
					/>
				)
                	: <EmptyState imageFind="NoInoiceFound" imgHeight="imageHeight" />}
			</div>
		</div>
	);
}

export default Invoices;
