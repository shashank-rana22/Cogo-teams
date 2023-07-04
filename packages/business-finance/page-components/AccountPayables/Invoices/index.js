import { Button, Input, Toggle } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Filter from '../../commons/Filters/index.tsx';
import List from '../../commons/List/index.tsx';

import { invoiceFilters } from './configurations';
import GetState from './GetState';
import useGetBillsList from './hooks/useGetBillsList';
import useGetDownloadReport from './hooks/useGetDownloadReport';
import PayRunModal from './InvoiceTable/PayrunModal';
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

const FIRST_PAGE = 1;

function Invoices({ activeEntity }) {
	const { query } = useRouter();
	const [activeTab, setActiveTab] = useState('all');
	const [show, setShow] = useState(false);
	const [showPayrunModal, setShowPayrunModal] = useState(false);

	const {
		billsData,
		billsLoading,
		billsFilters,
		setBillsFilters,
		orderBy,
		setOrderBy,
	} = useGetBillsList({ activeTab });

	const { stats = {} } = billsData || {};

	const { generateInvoice, loading: generating } = useGetDownloadReport({
		size          : stats?.all,
		globalFilters : billsFilters,
	});

	const handleVersionChange = () => {
		window.location.href = `/${query.partner_id}/business-finance/account-payables/invoices`;
	};

	const FUNCTIONS = {
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
				{TABS.map(({ label, value }) => (
					<TabStat
						name={label}
						isActive={activeTab === value}
						key={value}
						value={value}
						number={stats?.[value]}
						setActiveTab={setActiveTab}
					/>
				))}
			</div>
			<div className={styles.filters}>
				<div className={styles.filtercontainer}>
					<Filter controls={invoiceFilters} filters={billsFilters} setFilters={setBillsFilters} />
					<FilterModal filters={billsFilters} setFilters={setBillsFilters} activeTab={activeTab} />
				</div>
				<div className={styles.search_filter}>
					<Toggle
						name="toggle"
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleVersionChange}
					/>
					<div>
						<Button
							size="md"
							className={styles.button}
							onClick={() => {
								setShowPayrunModal(true);
							}}
						>
							Create Pay Run
						</Button>
					</div>
					<Button onClick={() => { setShow(true); }} className={styles.button}>Get State</Button>
					<Button
						onClick={generateInvoice}
						className={styles.button}
						disabled={generating}
					>
						{generating ? 'Generating' : 'Download'}

					</Button>
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
					functions={FUNCTIONS}
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
			{show ? <GetState show={show} setShow={setShow} /> : null}
			{showPayrunModal ? (
				<PayRunModal
					activeEntity={activeEntity}
					showPayrunModal={showPayrunModal}
					setShowPayrunModal={setShowPayrunModal}
				/>
			) : null}
		</div>
	);
}

export default Invoices;
