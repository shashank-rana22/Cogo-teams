import { Breadcrumb, Button, Placeholder } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMArrowBack, IcMInfo } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import List from '../../../commons/List';
import EmptyState from '../../../commons/StyledTable/EmptyState';
import { CREATE_NEW_PAYRUN_CONFIG } from '../Columns/createNewPayRunConfig';
import { VIEW_SELECTED_CONFIG } from '../Columns/viewSelectedConfig';
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
import DocumentNumber from './renderFunction/DocumentNumber';
import ModifiedName from './renderFunction/ModifiedName';
import SIDnumber from './renderFunction/SIDnumber';
import styles from './styles.module.css';

interface OrganizationTypes {
	organizationName:string,
}
interface ByProps {
	name:string
}
interface NameType {
	name:string,
}
interface BankType {
	accountNumber:string,
	bankName:string,
	ifscCode:string,
}
interface ItemProps {
	advanceDocumentSellerAddress:OrganizationTypes,
	advanceDocumentId?:string,
	advanceDocumentNo:string,
	approvedAt:Date,
	approvedBy:NameType,
	organizationName:string,
	id:string,
	requestedAt:Date,
	requestedBy:ByProps,
	jobNumber:string,
	sid:string,
	serviceType:string,
	payableAmount:number,
	currency:string,
	advanceDocumentSellerBankDetail:BankType,
	incidentRefNo:string,
	bankDetail?: Array<{
		account_number: string;
		beneficiary_name: string;
		ifsc_code: string;
	}>;
}

function CreateNewPayRun() {
	const [sort, setSort] = useState({});
	const [viewSelectedInvoice, setViewSelectedInvoice] = useState(false);
	const {
		filters, setFilters, data, loading,
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
		currency:selectedCurrency,
	} = useGetAdvancePaymentList({ sort, viewSelectedInvoice });
	const {
		data:existpayRunData, loading:existingPayRunLoading,
		getAdvancedPayment,
	} = useGetCreatePayRunType({ selectedPayRunId });

	const { list = [] } = existpayRunData || {};
	const { name = '', totalValue = '', currency = '', invoiceCount = '', createdAt = '' } = list[0] || {};
	const { pageIndex } = data || {};
	const { list:dataList = [] } = data || {};
	const dataListLength = dataList.length;
	const { list:selectedList = [] } = viewSelectedData || {};
	const selectedListLength = selectedList.length;
	const listLength = viewSelectedInvoice ? selectedListLength : dataListLength;

	useEffect(() => {
		if (selectedPayRunId) {
			getAdvancedPayment();
		}
	}, [getAdvancedPayment, selectedPayRunId]);

	const functions = {
		renderCheckbox    : (itemData:ItemProps) => getTableBodyCheckbox(itemData),
		renderBankDetails : (itemData:ItemProps) => <BankDetails itemData={itemData} />,
		renderIcDelete    : (itemData:ItemProps) => (
			<DeleteModal
				itemData={itemData}
				deleteSelecteInvoiceLoading={deleteSelecteInvoiceLoading}
				deleteInvoices={deleteInvoices}
			/>
		),
		renderAmountWithCurrency: (itemData:ItemProps) => (
			<AmountWithCurrency itemData={itemData} />
		),
		renderIncidentNumber: (itemData:ItemProps) => (
			<IncidentNumber itemData={itemData} />
		),
		renderSIDnumber: (itemData:ItemProps) => (
			<SIDnumber itemData={itemData} />
		),
		renderOrganization: (itemData:ItemProps) => (
			<OrganizationName itemData={itemData} />
		),
		renderRequestedBy: (itemData:ItemProps) => (
			<RequestedBy itemData={itemData} />
		),
		renderApprovedBy: (itemData:ItemProps) => (
			<ApprovedBy itemData={itemData} />
		),
		renderModifiedName: (itemData:ItemProps) => (
			<ModifiedName itemData={itemData} />
		),
		renderBankData: (itemData:ItemProps) => (
			<BankData itemData={itemData} />
		),
		renderDocNumber: (itemData:ItemProps) => (
			<DocumentNumber itemData={itemData} />
		),
	};
	return (
		<div>
			<div>
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
			{ selectedPayRunId
				&& (
					<div>
						<div className={styles.sub_container}>
							<div className={styles.text}>
								<div>
									{existingPayRunLoading ? <Placeholder className={styles.loader} />
										: name}
								</div>
							</div>
							<div className={styles.text}>
								Total value :
								{' '}
								{' '}
								<div>
									{existingPayRunLoading
										? <Placeholder className={styles.amount_loader} />
										: getFormattedPrice(totalValue, currency)}
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
										: invoiceCount}
								</div>
							</div>
							<div className={styles.text}>
								<div>
									{existingPayRunLoading
										? <Placeholder className={styles.loader} />
										: createdAt}
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
				{!viewSelectedInvoice && (
					<div className={styles.filter}>
						<SelectFilters filters={filters} setFilters={setFilters} />
					</div>
				)}
				<div className={styles.list_container}>
					{listLength > 0 ? (
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

						:					<EmptyState imageFind="NoInoiceFound" imgHeight="imageHeight" />}
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
					selectedCurrency={selectedCurrency}
				/>
			</div>

		</div>
	);
}

export default CreateNewPayRun;
