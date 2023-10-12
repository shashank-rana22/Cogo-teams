import { Breadcrumb, Button } from '@cogoport/components';
import { Link } from '@cogoport/next';
import React from 'react';

import List from '../../../../commons/List/index';
import RenderInvoiceNumber from '../../commons/RenderInvoiceNumber';
import useGetSelectedInvoices from '../../hooks/useGetSelectedInvoices';
import { RenderAction } from '../../InvoiceTable/RenderFunctions/RenderAction';
import { RenderInvoiceDates } from '../../InvoiceTable/RenderFunctions/RenderInvoiceDates';
import { RenderToolTip } from '../../InvoiceTable/RenderFunctions/RenderToolTip';
import { RenderUrgency } from '../../InvoiceTable/RenderFunctions/RenderUrgency';

import BankDetails from './BankDetails';
import Delete from './Delete';
import styles from './styles.module.css';

const FIRST_PAGE = 1;

const getFunctions = ({ getInvoices = () => {} }) => ({
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
		<RenderAction itemData={itemData} hideIcDot />
	),
	renderBankDetails   : (itemData) => (<BankDetails itemData={itemData} />),
	renderDelete        : (itemData) => (<Delete itemData={itemData} refetch={getInvoices} />),
	renderInvoiceNumber : (itemData, field) => (
		<RenderInvoiceNumber itemData={itemData} field={field} />
	),
});

function ViewSelectedInvoices({ apiData = {}, setApiData = () => {}, setViewSelectedInvoices = () => {} }) {
	const {
		selectedInvoiceLoading = false,
		filters = {},
		setFilters = () => {},
		getInvoices = () => {},
		config = [],
	} = useGetSelectedInvoices({ apiData, setApiData });

	const LIST_FUNCTIONS = getFunctions({ getInvoices });

	return (
		<div>
			<div className={styles.back}>
				<Breadcrumb>
					<Breadcrumb.Item label={(
						<Link href="/business-finance/account-payables/invoices">
							Invoices
						</Link>
					)}
					/>
					<Breadcrumb.Item label="PayRun Creation" />
					<Breadcrumb.Item label="Select Invoices" />
				</Breadcrumb>

				<Button
					themeType="accent"
					onClick={() => { setViewSelectedInvoices(false); }}
					style={{ width: '100px' }}
				>
					Go Back
				</Button>
			</div>

			<div className={styles.list_container}>
				<List
					itemData={apiData}
					loading={selectedInvoiceLoading}
					config={config}
					functions={LIST_FUNCTIONS}
					page={filters?.pageIndex || FIRST_PAGE}
					pageSize={10}
					handlePageChange={(val) => setFilters({
						...filters,
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

export default ViewSelectedInvoices;
