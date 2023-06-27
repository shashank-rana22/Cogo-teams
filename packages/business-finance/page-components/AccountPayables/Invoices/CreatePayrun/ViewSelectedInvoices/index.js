import { Breadcrumb, Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import React, { useImperativeHandle, forwardRef } from 'react';

import List from '../../../../commons/List/index.tsx';
import useGetPayrunInvoices from '../../hooks/useGetPayrunInvoices';
import { RenderAction } from '../../InvoiceTable/RenderFunctions/RenderAction';
import { RenderInvoiceDates } from '../../InvoiceTable/RenderFunctions/RenderInvoiceDates';
import { RenderToolTip } from '../../InvoiceTable/RenderFunctions/RenderToolTip';
import { RenderUrgency } from '../../InvoiceTable/RenderFunctions/RenderUrgency';
import { VIEW_SELECTED_CONFIG } from '../Configurations/viewSelectedConfig';

import styles from './styles.module.css';

const FIRST_PAGE = 1;

function ViewSelectedInvoices({ apiData, setApiData, setViewSelectedInvoices }, ref) {
	const {
		billsData,
		billsLoading,
		filters,
		setFilters,
		orderBy,
		setOrderBy,
		getPayrunInvoices,
		getTableBodyCheckbox,
		getTableHeaderCheckbox,
	} = useGetPayrunInvoices({ apiData, setApiData });

	useImperativeHandle(ref, () => ({
		getPayrunInvoices,
	}));

	const FUNCTIONS = {
		renderCheckbox : (itemData) => getTableBodyCheckbox(itemData),
		renderToolTip  : (itemData, field) => (
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
					itemData={billsData}
					loading={billsLoading}
					config={VIEW_SELECTED_CONFIG}
					functions={FUNCTIONS}
					sort={orderBy}
					setSort={setOrderBy}
					page={filters?.pageIndex || FIRST_PAGE}
					pageSize={10}
					handlePageChange={(val) => setFilters({
						...filters,
						pageIndex: val,
					})}
					renderHeaderCheckbox={getTableHeaderCheckbox}
					rowStyle="border"
					showPagination
					paginationType="number"
				/>
			</div>
		</div>
	);
}

export default forwardRef(ViewSelectedInvoices);
