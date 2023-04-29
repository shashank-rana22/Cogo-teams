import { Breadcrumb, Button, Placeholder } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMArrowBack, IcMInfo } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import List from '../../../commons/List';
import { CREATE_NEW_PAYRUN_CONFIG } from '../Columns/createNewPayRunConfig';
import { VIEW_SELECTED_CONFIG } from '../Columns/viewSelectedConfig';
import EmptyState from '../common/EmptyState';
import useGetAdvancePaymentList from '../hooks/useGetAdvancePaymentList';
import useGetCreatePayRunType from '../hooks/useGetCreatePayRunType';
import AmountWithCurrency from '../renderFunction/AmountWithCurrency';
import ApprovedBy from '../renderFunction/ApprovedBy';
import IncidentNumber from '../renderFunction/IncidentNumber';
import OrganizationName from '../renderFunction/OrganizationName';
import RequestedBy from '../renderFunction/RequestedBy';
import SelectFilters from '../SelectFilters';

import Footer from './Footer';
import BankData from './renderFunction/BankData';
import BankDetails from './renderFunction/BankDetails';
import DeleteModal from './renderFunction/DeleteModal/index';
import ModifiedName from './renderFunction/ModifiedName';
import SIDnumber from './renderFunction/SIDnumber';
import styles from './styles.module.css';

function CreateNewPayRun() {
	const [sort, setSort] = useState({});
	const [viewSelectedInvoice, setViewSelectedInvoice] = useState(false);
	const {
		filters, setFilters, data, loading, entity,
		apiData,
		submitSelectedInvoices,
		getTableBodyCheckbox,
		getTableHeaderCheckbox,
		viewSelectedData,
		viewSelectedDataLoading,
		getViewSelectedInvoices,
		selectedPayRunId,
		deleteSelecteInvoiceLoading,
		deleteInvoices,
		selectedDataLoading,
	} = useGetAdvancePaymentList({ sort, viewSelectedInvoice });
	const {
		data:existpayRunData, loading:existingPayRunLoading,
		getAdvancedPayment,
	} = useGetCreatePayRunType({ selectedPayRunId });
	useEffect(() => {
		if (selectedPayRunId) {
			getAdvancedPayment();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const { list } = existpayRunData || {};
	const { pageIndex } = data || {};

	const listLength = viewSelectedInvoice ? viewSelectedData?.list?.length : data?.list?.length;
	const functions = {
		renderCheckbox    : (itemData) => getTableBodyCheckbox(itemData),
		renderBankDetails : (itemData) => <BankDetails itemData={itemData} />,
		renderIcDelete    : (itemData) => (
			<DeleteModal
				itemData={itemData}
				deleteSelecteInvoiceLoading={deleteSelecteInvoiceLoading}
				deleteInvoices={deleteInvoices}
			/>
		),
		renderAmountWithCurrency: (itemData) => (
			<AmountWithCurrency itemData={itemData} />
		),
		renderIncidentNumber: (itemData) => (
			<IncidentNumber itemData={itemData} />
		),
		renderSIDnumber: (itemData) => (
			<SIDnumber itemData={itemData} />
		),
		renderOrganization: (itemData) => (
			<OrganizationName itemData={itemData} />
		),
		renderRequestedBy: (itemData) => (
			<RequestedBy itemData={itemData} />
		),
		renderApprovedBy: (itemData) => (
			<ApprovedBy itemData={itemData} />
		),
		renderModifiedName: (itemData) => (
			<ModifiedName itemData={itemData} />
		),
		renderBankData: (itemData) => (
			<BankData itemData={itemData} />
		),
	};
	return (
		<div>
			<div className={styles.bread_crumb}>
				<Breadcrumb>
					<Breadcrumb.Item label={(
						<Link href="/business-finance/account-payables/advance-payment">
							Advance Payment
						</Link>
					)}
					/>
					<Breadcrumb.Item label="PayRun Creation" />
					<Breadcrumb.Item label="Select Invoices" />
				</Breadcrumb>
			</div>
			{viewSelectedInvoice
			&& (
				<div className={styles.back}>
					<div>
						<IcMArrowBack height={20} width={20} />
					</div>
					<div>
						<Button size="lg" themeType="linkUi" onClick={() => { setViewSelectedInvoice(false); }}>
							<div className={styles.button}>
								Go back to invoice selection
							</div>
						</Button>
					</div>
				</div>
			)}
			{ !selectedPayRunId
				? (
					<div className={styles.select_card}>
						<div className={styles.card}>
							Entity -
							{' '}
							{entity}
						</div>
					</div>
				)
				: (
					<div>
						<div className={styles.sub_container}>
							<div className={styles.text}>
								<div>
									{existingPayRunLoading ? <Placeholder className={styles.loader} />
										: list?.[0]?.name}
								</div>
							</div>
							<div className={styles.text}>
								Total value :
								{' '}
								{' '}
								<div>
									{existingPayRunLoading
										? <Placeholder className={styles.amount_loader} />
										: getFormattedPrice(list?.[0]?.totalValue, list?.[0]?.currency)}
								</div>
							</div>
							<div className={styles.text}>
								No. of invoices :
								{' '}
								{' '}
								{' '}
								<div>
									{existingPayRunLoading
										? <Placeholder className={styles.amount_loader} />
										: list?.[0]?.invoiceCount}
								</div>
							</div>
							<div className={styles.text}>
								<div>
									{existingPayRunLoading
										? <Placeholder className={styles.loader} />
										: list?.[0]?.createdAt}
								</div>
							</div>
							<div className={styles.ribbons}>
								<div className={styles.ribbon}>Adv. Payment</div>
							</div>
						</div>
						<div className={styles.info_container}>

							<div className={styles.info}>
								<IcMInfo color="#ED3726" />
							</div>
							<div className={styles.info_text}>
								You are adding these advance payments to an existent Payment ready pay run.
							</div>
						</div>
					</div>
				)}
			<div className={styles.container}>
				<div className={styles.filter}>
					<SelectFilters filters={filters} setFilters={setFilters} />
				</div>
				<div className={styles.list_container}>
					{(loading || viewSelectedDataLoading || listLength > 0) ? (
						<List
							itemData={viewSelectedInvoice ? viewSelectedData : data}
							loading={viewSelectedInvoice ? viewSelectedDataLoading : loading}
							config={viewSelectedInvoice ? VIEW_SELECTED_CONFIG : CREATE_NEW_PAYRUN_CONFIG}
							functions={functions}
							renderHeaderCheckbox={getTableHeaderCheckbox}
							sort={sort}
							setSort={setSort}
							page={pageIndex}
							pageSize={10}
							handlePageChange={(val: number) => setFilters({
								...filters,
								pageIndex: val,
							})}
							showPagination
						/>
					)

						:					<EmptyState />}
				</div>
				<Footer
					apiData={apiData}
					viewSelectedInvoice={viewSelectedInvoice}
					setViewSelectedInvoice={setViewSelectedInvoice}
					submitSelectedInvoices={submitSelectedInvoices}
					getViewSelectedInvoices={getViewSelectedInvoices}
					getAdvancedPayment={getAdvancedPayment}
					viewSelectedData={viewSelectedData}
					selectedPayRunId={selectedPayRunId}
					selectedDataLoading={selectedDataLoading}
					loading={loading}
					viewSelectedDataLoading={viewSelectedDataLoading}
				/>
			</div>

		</div>
	);
}

export default CreateNewPayRun;
