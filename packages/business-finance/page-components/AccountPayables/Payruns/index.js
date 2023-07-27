import React, { useState } from 'react';

import List from '../../commons/List/index.tsx';

import RenderPaidAccordian from './DropDownItem/RenderPaidAccordian';
import Header from './Header';
import useFilterData from './hooks/useFilterData';
import InvoiceCard from './InvoiceCard';
import renderFunctions from './renderFunction';
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
		data = {}, loading = false, payrunStats = {}, config = {}, setSelectedPayrun = () => {}, selectedPayrun = null,
		globalFilters = {}, selectedIds = [], setSelectedIds = () => {},
		setGlobalFilters = () => {}, sort = {}, setSort = () => {}, refetch = () => {},
	} = useFilterData({
		isInvoiceView,
		activePayrunTab,
		overseasData,
		setOverseasData,
		setViewId,
		setCheckedRow,
	});

	const { functions } = renderFunctions(
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
			refetch,
			selectedIds,
			setSelectedIds,
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
				refetch={refetch}
				selectedIds={selectedIds}
				setSelectedIds={setSelectedIds}
			/>
			{selectedPayrun ? (
				<InvoiceCard
					setSelectedPayrun={setSelectedPayrun}
					itemData={data}
					setSelectedIds={setSelectedIds}
					loading={loading}
				/>
			) : null}
			<List
				itemData={data}
				config={config}
				loading={loading}
				functions={functions}
				page={globalFilters.pageIndex}
				pageSize={10}
				sort={sort}
				setSort={setSort}
				handlePageChange={(val) => setGlobalFilters((prev) => ({
					...prev,
					pageIndex: val,
				}))}
				showPagination
				viewId={viewId}
				dropDownData={dropDownData}
				loadingDropDown={loadingDropDown}
				activePayrunTab={activePayrunTab}
				paginationType="number"
				renderDropDown={(singleitem) => (
					<RenderPaidAccordian
						dropDownData={dropDownData}
						loadingDropDown={loadingDropDown}
						viewId={viewId}
						singleitem={singleitem}
					/>
				)}
			/>
		</div>
	);
}

export default Payruns;
