import React, { useState } from 'react';

import List from '../../commons/List/index.tsx';

import Header from './Header';
import useFilterData from './hooks/useFilterData';
import InvoiceCard from './InvoiceCard/index';
import RenderFunctions from './renderFunction/index';
import styles from './styles.module.css';

function Payruns({ activeEntity = '' }) {
	const [activePayrunTab, setActivePayrunTab] = useState('INITIATED');
	const [isInvoiceView, setIsInvoiceView] = useState(false);
	const [overseasData, setOverseasData] = useState('NORMAL');
	const [viewId, setViewId] = useState(null);
	const [dropDownData, setDropDownData] = useState([]);
	const [loadingDropDown, setLoadingDropDown] = useState(false);
	const [checkedRow, setCheckedRow] = useState(null);
	const {
		data,
		loading,
		payrunStats,
		config, setSelectedPayrun = () => {}, selectedPayrun = null,
		globalFilters,
		setGlobalFilters, sort, setSort,
	} = useFilterData({
		isInvoiceView,
		activePayrunTab,
		overseasData,
		setOverseasData,
		setViewId,
		setCheckedRow,
	});

	const { functions } = RenderFunctions(
		{
			overseasData,
			viewId,
			setViewId,
			setDropDownData,
			setLoadingDropDown,
			selectedPayrun,
			setSelectedPayrun,
			checkedRow,
			setCheckedRow,
		},
	);

	return (

		<div className={styles.container}>
			<Header
				activePayrunTab={activePayrunTab}
				setActivePayrunTab={setActivePayrunTab}
				payrunStats={payrunStats}
				isInvoiceView={isInvoiceView}
				setIsInvoiceView={setIsInvoiceView}
				overseasData={overseasData}
				setOverseasData={setOverseasData}
				globalFilters={globalFilters}
				setGlobalFilters={setGlobalFilters}
				selectedPayrun={selectedPayrun}
				setSelectedPayrun={setSelectedPayrun}
				checkedRow={checkedRow}
				setCheckedRow={setCheckedRow}
				itemData={data}
				activeEntity={activeEntity}
			/>
			{selectedPayrun ? <InvoiceCard setSelectedPayrun={setSelectedPayrun} itemData={data} /> : null}
			<List
				itemData={data}
				config={config}
				loading={loading}
				functions={functions}
				page={globalFilters.pageIndex}
				pageSize={10}
				sort={sort}
				setSort={setSort}
				handlePageChange={(val) => setGlobalFilters({
					...globalFilters,
					pageIndex: val,
				})}
				showPagination
				viewId={viewId}
				dropDownData={dropDownData}
				loadingDropDown={loadingDropDown}
				activePayrunTab={activePayrunTab}
			/>
		</div>
	);
}

export default Payruns;
