import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import List from '../../../../commons/List/index.tsx';
import EditableTdsInput from '../../CreatePayrun/SelectInvoices/EditableInput';
import EditablePayableAmount from '../../CreatePayrun/SelectInvoices/EditableInput/EditablePayableAmount';
import BankDetails from '../../CreatePayrun/ViewSelectedInvoices/BankDetails/index';
import Delete from '../../CreatePayrun/ViewSelectedInvoices/Delete/index';
import useGetInvoiceSelection from '../../hooks/useInvoiceSelection';
import { RenderAction } from '../../InvoiceTable/RenderFunctions/RenderAction';
import { RenderInvoiceDates } from '../../InvoiceTable/RenderFunctions/RenderInvoiceDates';
import { RenderToolTip } from '../../InvoiceTable/RenderFunctions/RenderToolTip';
import { RenderUrgency } from '../../InvoiceTable/RenderFunctions/RenderUrgency';

import FilterContainers from './FilterContainers';
import Footer from './Footer';
import styles from './styles.module.css';

const MORE_THAN_ZERO = 0;
const FIRST_PAGE = 1;

const getFunctions = ({ GetTableBodyCheckbox = () => {}, setEditedValue = () => {}, refetch = () => {} }) => ({
	renderCheckbox : (itemData) => GetTableBodyCheckbox(itemData),
	renderToolTip  : (itemData, field) => (
		<RenderToolTip
			itemData={itemData}
			field={field}
		/>
	),
	renderInvoiceDates: (itemData, field) => (
		<RenderInvoiceDates
			itemData={itemData}
			field={field}
		/>
	),
	renderUrgencyTag: (itemData, field) => (
		<RenderUrgency
			itemData={itemData}
			field={field}
		/>
	),
	renderAction: (itemData) => (
		<RenderAction itemData={itemData} />
	),
	renderEditableTds: (itemData, field) => (
		<EditableTdsInput
			itemData={itemData}
			field={field}
			setEditedValue={setEditedValue}
		/>
	),
	renderEditablePayable: (itemData, field) => (
		<EditablePayableAmount
			itemData={itemData}
			field={field}
			setEditedValue={setEditedValue}
		/>
	),
	renderBankDetails: (itemData, field) => (
		<BankDetails
			itemData={itemData}
			field={field}
			setEditedValue={setEditedValue}
		/>
	),
	renderDelete: (itemData) => (<Delete itemData={itemData} refetch={refetch} />),

});
function InvoiceSelection({
	setActive = () => {},
	setShowHeader = () => {},
	showHeader = true,
	active = '',
	setBLData = () => {},
	setShowPayableAmount = () => {},
	setShowSaveAsDraft = () => {},
}) {
	const [sort, setSort] = useState({});

	const {
		config,
		globalFilters,
		invoiceData,
		setGlobalFilters,
		setViewSelectedInvoice,
		viewSelectedInvoice,
		onClear,
		listSelectedInvoice,
		submitSelectedInvoices,
		createloading,
		GetTableHeaderCheckbox,
		GetTableBodyCheckbox,
		setEditedValue,
		loading,
		goBack,
		refetch,
	} = useGetInvoiceSelection({ sort });

	const { overAllValue = 0, list = [] } = invoiceData || {};

	const isChecked = list.filter(
		(item) => item.checked && item.invoiceType === 'PURCHASE',
	);
	const isCreditChecked = list.filter(
		(item) => item.checked && item.invoiceType === 'CREDIT NOTE',
	);
	const tdsError = isChecked.filter((item) => item.tdsError);
	const paidError = isChecked.filter((item) => item.paidError);

	const totalCreditInvoiceAmount = isCreditChecked.reduce((acc, obj) => +acc + +obj.invoiceAmount, MORE_THAN_ZERO);

	const totalInvoiceAmount = isChecked.reduce((acc, obj) => +acc + +obj.invoiceAmount, MORE_THAN_ZERO);

	const calc = overAllValue - +totalInvoiceAmount;
	const totalCalc = calc + +totalCreditInvoiceAmount;

	useEffect(() => {
		if (active === 'invoice_selection' && totalCalc > MORE_THAN_ZERO) {
			setShowPayableAmount(totalCalc);
		}
	}, [totalCalc, setShowPayableAmount, active]);

	useEffect(() => {
		if (isEmpty(invoiceData?.list)) {
			setShowSaveAsDraft(true);
		}
	}, [invoiceData, setShowSaveAsDraft]);

	const LIST_FUNCTIONS = getFunctions({ GetTableBodyCheckbox, setEditedValue, refetch });

	return (
		<div className={styles.container}>
			<FilterContainers
				filters={globalFilters}
				setFilters={setGlobalFilters}
				goBack={goBack}
				active={active}
				showHeader={showHeader}
				setShowHeader={setShowHeader}
				viewSelectedInvoice={viewSelectedInvoice}
				onClear={onClear}
			/>

			<div className={styles.list_container}>
				<List
					itemData={invoiceData}
					loading={loading}
					config={config}
					functions={LIST_FUNCTIONS}
					setSort={setSort}
					page={globalFilters?.pageIndex || FIRST_PAGE}
					pageSize={20}
					handlePageChange={(val) => setGlobalFilters({
						...globalFilters,
						pageIndex: val,
					})}
					renderHeaderCheckbox={GetTableHeaderCheckbox}
					rowStyle="border"
					showPagination
					paginationType="number"
				/>
			</div>

			<Footer
				viewSelectedInvoices={viewSelectedInvoice}
				setViewSelectedInvoices={setViewSelectedInvoice}
				apiData={invoiceData}
				loading={loading}
				submitSelectedInvoices={submitSelectedInvoices}
				setShowHeader={setShowHeader}
				listSelectedInvoice={listSelectedInvoice}
				selectButton={tdsError.length || paidError.length}
				setActive={setActive}
				setBLData={setBLData}
				createloading={createloading}
			/>
		</div>
	);
}

export default InvoiceSelection;
