import { Breadcrumb, Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import React from 'react';

import List from '../../../../commons/List/index.tsx';
import useGetSelectedInvoices from '../../hooks/useGetSelectedInvoices';
import { RenderAction } from '../../InvoiceTable/RenderFunctions/RenderAction';
import { RenderInvoiceDates } from '../../InvoiceTable/RenderFunctions/RenderInvoiceDates';
import { RenderToolTip } from '../../InvoiceTable/RenderFunctions/RenderToolTip';
import { RenderUrgency } from '../../InvoiceTable/RenderFunctions/RenderUrgency';
import { VIEW_SELECTED_CONFIG } from '../Configurations/viewSelectedConfig';

import BankDetails from './BankDetails';
import Delete from './Delete';
import styles from './styles.module.css';

const FIRST_PAGE = 1;

const getFunctions = ({ getInvoices }) => ({
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
	renderBankDetails : (itemData) => (<BankDetails itemData={itemData} />),
	renderDelete      : (itemData) => (<Delete itemData={itemData} refetch={getInvoices} />),
});

function ViewSelectedInvoices({ apiData, setApiData, setViewSelectedInvoices }) {
	const {
		selectedInvoiceLoading,
		filters,
		setFilters,
		getInvoices,
	} = useGetSelectedInvoices({ apiData, setApiData });

	const FUNCTIONS = getFunctions({ getInvoices });

	return (
		<div>
			<div>
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
			</div>
			<div className={styles.back}>
				<div>
					<IcMArrowBack height={20} width={20} />
				</div>
				<div>
					<Button size="lg" themeType="linkUi" onClick={() => { setViewSelectedInvoices(false); }}>
						<div className={styles.button}>
							Go back to invoice selection
						</div>
					</Button>
				</div>
			</div>
			<div className={styles.list_container}>
				<List
					itemData={apiData}
					loading={selectedInvoiceLoading}
					config={VIEW_SELECTED_CONFIG}
					functions={FUNCTIONS}
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
