import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import List from '../../../../commons/List/index.tsx';
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

	const renderHeaderCheckbox = () => GetTableHeaderCheckbox({ apiData, data, loading, setApiData });

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

	useEffect(() => {
		if (isEmpty(invoiceData?.list)) {
			setShowSaveAsDraft(true);
		}
	}, [invoiceData, setShowSaveAsDraft]);

	const LIST_FUNCTIONS = getFunctions({
		onChangeTableBodyCheckbox,
		setEditedValue,
		refetch     : viewSelectedInvoice ? selectedListRefetch : refetch,
		invoiceData : viewSelectedInvoice ? selectedListData : invoiceData,
		setApiData,
	});

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
