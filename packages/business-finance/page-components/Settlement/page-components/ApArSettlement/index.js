import React, { useState, useEffect } from 'react';

import EmptyState from '../../commons/EmptyState';
import useGetDocumentList from '../../hooks/useGetDocumentList';

import Amount from './Amount';
import DocList from './DocList';
import Filters from './Filters';
import MatchModal from './MatchModal';
import { SearchFilters } from './SearchFilters';
import styles from './styles.module.css';

const INITIAL_MAT_BAL = 0;
const EMPTY_DATA_LENGTH = 0;

function ApArSettlement() {
	const [filters, setFilters] = useState({
		entityCode : '301',
		date       : { startDate: null, endDate: null },
		tradeParty : '',
		accMode    : '',
		search     : '',
		page       : 1,
		pageLimit  : 10,
		docType    : '',
		status     : '',
	});

	const [sorting, setSorting] = useState({
		sortType: 'Asc',
	});

	const TEXT = 	(filters?.entityCode && filters?.tradeParty)
		? 'Looks like you do not have any data in this category'
		: 'Select filters to find what you\'re looking for';

	const [selectedData, setSelectedData] = useState([]);
	const [matchBal, setMatchBal] = useState(INITIAL_MAT_BAL);
	const TOTAL_MATCHING_BALANCE = selectedData.reduce((sum, item) => +sum
	+ +item.balanceAmount * +item.exchangeRate * +item.signFlag, INITIAL_MAT_BAL);
	const [reRender, setReRender] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [pageCheckedRows, setPageCheckedRows] = useState({});
	const [matchModalShow, setMatchModalShow] = useState(false);

	const {
		data = [], loading = false, accountData = [], accountLoading = false,
		submitSettleMatch = () => {},
		settleLoading = false,
	} = useGetDocumentList({
		filters,
		sorting,
		setMatchModalShow,
		setSelectedData,
	});

	const handleFilterChange = (filterName, value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterName] : value,
			page         : 1,
		}));
	};

	const onPageChange = (val) => {
		setFilters((prev) => ({ ...prev, page: val }));
	};

	function DataRender() {
		if (data && data?.list?.length > EMPTY_DATA_LENGTH) {
			return (
				<DocList
					data={data}
					loading={loading}
					onPageChange={onPageChange}
					selectedData={selectedData}
					setSelectedData={setSelectedData}
					setSortData={setSorting}
					sortData={sorting}
					pageCheckedRows={pageCheckedRows}
					setPageCheckedRows={setPageCheckedRows}
				/>
			);
		}
		return (
			<div className={styles.emptycontainer}>
				<EmptyState height={315} width={482} Text={TEXT} />
			</div>
		);
	}

	useEffect(() => {
		setSelectedData([]);
	}, [filters?.tradeParty, filters?.entityCode]);

	const pageCheckedRowsStringfy = JSON.stringify(pageCheckedRows);
	useEffect(() => {
		const SELECTED_IDS = new Set(selectedData?.map((row) => row.id));

		const UPDATEDPAGECHECKEDROWS = {};
		Object.keys(JSON.parse(pageCheckedRowsStringfy)).forEach((pageNo) => {
			UPDATEDPAGECHECKEDROWS[pageNo] = JSON.parse(
				pageCheckedRowsStringfy,
			)[pageNo]?.filter((id) => SELECTED_IDS?.has(id));
		});
		setPageCheckedRows(UPDATEDPAGECHECKEDROWS);

		const TOTAL = selectedData?.reduce((sum, item) => +sum + (+item.balanceAmount
		* +item.exchangeRate * +item.signFlag), INITIAL_MAT_BAL);
		setMatchBal(TOTAL);
	}, [selectedData, pageCheckedRowsStringfy]);

	return (
		<div>
			<Filters
				filters={filters}
				onFiltersChange={handleFilterChange}
				loading={loading}
			/>
			<SearchFilters
				filters={filters}
				onFiltersChange={handleFilterChange}
				loading={loading}

			/>
			{

			loading ? (
				<div>

					<DocList
						data={data}
						loading={loading}
						onPageChange={onPageChange}
						selectedData={selectedData}
						setSelectedData={setSelectedData}
						setSortData={setSorting}
						sortData={sorting}
						pageCheckedRows={pageCheckedRows}
						setPageCheckedRows={setPageCheckedRows}
					/>
				</div>
			)
				: <DataRender />

}
			<Amount
				data={accountData}
				loading={accountLoading}
				selectedData={selectedData}
				matchModalShow={matchModalShow}
				setMatchModalShow={setMatchModalShow}
				totalMatchingBalance={TOTAL_MATCHING_BALANCE}
				matchBal={matchBal}
				setMatchBal={setMatchBal}
				filters={filters}
				dataLoading={loading}
			/>
			{matchModalShow ? (
				<MatchModal
					matchModalShow={matchModalShow}
					setMatchModalShow={setMatchModalShow}
					totalMatchingBalance={TOTAL_MATCHING_BALANCE}
					selectedData={selectedData}
					setSelectedData={setSelectedData}
					loading={loading}
					filters={filters}
					reRender={reRender}
					setReRender={setReRender}
					isDelete={isDelete}
					setIsDelete={setIsDelete}
					matchBal={matchBal}
					setMatchBal={setMatchBal}
					submitSettleMatch={submitSettleMatch}
					settleLoading={settleLoading}
				/>
			) : null}
		</div>

	);
}

export default ApArSettlement;
