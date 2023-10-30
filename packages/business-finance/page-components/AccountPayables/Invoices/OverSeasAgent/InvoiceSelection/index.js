import React, { useState, useEffect } from 'react';

import List from '../../../../commons/List/index';
import useGetInvoiceSelection from '../../hooks/useInvoiceSelection';
import useListGetSelectedPayrun from '../../hooks/useListGetSelectedPayrun';
import usePostInvoicePurchasePayrun from '../../hooks/usePostInvoicePurchasePayrun';

import FilterContainers from './FilterContainers';
import Footer from './Footer';
import getFunctions from './getFunctions';
import { GetTableHeaderCheckbox, onChangeTableBodyCheckbox } from './InvoicesCheckbox';
import styles from './styles.module.css';

const MORE_THAN_ZERO = 0;
const ZERO_AMOUNT = 0;
const FIRST_PAGE = 1;
const EMPTY_DATA_LENGTH = 0;

function InvoiceSelection({
	setActive = () => {},
	setShowHeader = () => {},
	active = '',
	setBLData = () => {},
	setShowPayableAmount = () => {},
	setShowSaveAsDraft = () => {},
	allowed = true,
}) {
	const [sort, setSort] = useState({});

	const {
		config = [],
		globalFilters = {},
		invoiceData = {},
		setGlobalFilters = () => {},
		setViewSelectedInvoice = () => {},
		viewSelectedInvoice = false,
		onClear = () => {},
		setEditedValue = () => {},
		loading = false,
		goBack = () => {},
		refetch = () => {},
		apiData = {},
		data = {},
		setApiData = () => {},
		payload = {},
	} = useGetInvoiceSelection({ sort });

	const {
		selectedListRefetch = () => {},
		selectedListLoading = false,
		selectedListData = {},
	} = useListGetSelectedPayrun({ payload, viewSelectedInvoice, setApiData });

	const renderHeaderCheckbox = () => GetTableHeaderCheckbox({ apiData, data, loading, setApiData, allowed });

	const {
		onSubmitSelectedInvoices = () => {},
		createloading = false,
	} = usePostInvoicePurchasePayrun({ apiData: invoiceData, refetch });

	const { overAllValue = 0, list = [] } = invoiceData || {};

	const isChecked = (list || [])?.filter(
		(item) => item?.checked && item?.invoiceType === 'PURCHASE',
	);
	const isCreditChecked = (list || [])?.filter(
		(item) => item?.checked && item?.invoiceType === 'CREDIT NOTE',
	);
	const tdsError = (isChecked || [])?.filter((item) => item?.tdsError);
	const paidError = (isChecked || [])?.filter((item) => item?.paidError);

	const totalCreditInvoiceAmount = isCreditChecked.reduce(
		(acc, obj) => +acc + +obj.invoiceAmount || ZERO_AMOUNT,
		MORE_THAN_ZERO,
	);

	const totalInvoiceAmount = isChecked.reduce((acc, obj) => +acc + +obj.invoiceAmount || ZERO_AMOUNT, MORE_THAN_ZERO);

	const calc = overAllValue - +totalInvoiceAmount;
	const totalCalc = calc + +totalCreditInvoiceAmount;

	useEffect(() => {
		if (active === 'invoice_selection') {
			setShowPayableAmount(totalCalc);
		}
	}, [totalCalc, setShowPayableAmount, active]);

	const selectedInvoiceListLength = selectedListData?.list?.length || EMPTY_DATA_LENGTH;

	useEffect(() => {
		const getCondition = invoiceData?.list?.length === EMPTY_DATA_LENGTH
		|| selectedInvoiceListLength === EMPTY_DATA_LENGTH;
		setShowSaveAsDraft(getCondition);
	}, [invoiceData, setShowSaveAsDraft, selectedInvoiceListLength]);

	const LIST_FUNCTIONS = getFunctions({
		onChangeTableBodyCheckbox,
		setEditedValue,
		refetch     : viewSelectedInvoice ? selectedListRefetch : refetch,
		invoiceData : viewSelectedInvoice ? selectedListData : invoiceData,
		setApiData,
		allowed,
	});

	return (
		<div className={styles.container}>
			<FilterContainers
				filters={globalFilters}
				setFilters={setGlobalFilters}
				goBack={goBack}
				setShowHeader={setShowHeader}
				viewSelectedInvoice={viewSelectedInvoice}
				onClear={onClear}
			/>

			<div className={styles.list_container}>
				<List
					itemData={viewSelectedInvoice ? selectedListData : invoiceData}
					loading={viewSelectedInvoice ? selectedListLoading : loading}
					config={config}
					functions={LIST_FUNCTIONS}
					setSort={setSort}
					page={globalFilters?.pageIndex || FIRST_PAGE}
					pageSize={20}
					handlePageChange={(val) => setGlobalFilters({
						...globalFilters,
						pageIndex: val,
					})}
					renderHeaderCheckbox={renderHeaderCheckbox}
					rowStyle="border"
					showPagination
					paginationType="number"
					allowed={allowed}
				/>
			</div>

			<Footer
				viewSelectedInvoices={viewSelectedInvoice}
				setViewSelectedInvoices={setViewSelectedInvoice}
				apiData={invoiceData}
				loading={loading}
				onSubmitSelectedInvoices={onSubmitSelectedInvoices}
				setShowHeader={setShowHeader}
				selectedListLoading={selectedListLoading}
				selectButton={tdsError.length || paidError.length}
				setActive={setActive}
				setBLData={setBLData}
				createloading={createloading}
			/>
		</div>
	);
}

export default InvoiceSelection;
