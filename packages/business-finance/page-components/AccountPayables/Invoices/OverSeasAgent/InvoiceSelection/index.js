import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import List from '../../../../commons/List/index.tsx';
import useAddInvoiceToSelectedApi from '../../hooks/useAddInvoiceToSelectedApi';
import useGetInvoiceSelection from '../../hooks/useInvoiceSelection';

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
		listSelectedInvoice = [],
		setEditedValue = () => {},
		loading = false,
		goBack = () => {},
		refetch = () => {},
		apiData = {},
		data = {},
		setApiData = () => {},
	} = useGetInvoiceSelection({ sort });

	const renderHeaderCheckbox = () => GetTableHeaderCheckbox({ apiData, data, loading, setApiData });

	const {
		submitSelectedInvoices = () => {},
		createloading = false,
	} = useAddInvoiceToSelectedApi({ apiData: invoiceData, refetch });

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
		if (active === 'invoice_selection' && totalCalc > MORE_THAN_ZERO) {
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
		refetch,
		invoiceData,
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
