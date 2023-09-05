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
		entityCode : '',
		date       : { startDate: null, endDate: null },
		tradeParty : '',
		accMode    : '',
		sort       : {},
		search     : '',
		page       : 1,
		pageLimit  : 10,
		docType    : '',
		status     : '',
	});

	const { search, ...restfilters } = filters || {};

	const [sorting, setSorting] = useState({
		sortType: 'Asc',
	});

	const Text = 	(filters?.entityCode && filters?.tradeParty)
		? 'Looks like you do not have any data in this category'
		: 'Select filters to find what you\'re looking for';

	const [selectedData, setSelectedData] = useState([]);
	const [matchBal, setMatchBal] = useState(INITIAL_MAT_BAL);
	const totalMatchingBalance = selectedData.reduce((sum, item) => sum + item.balanceAmount, INITIAL_MAT_BAL);
	const [reRender, setReRender] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [pageCheckedRows, setPageCheckedRows] = useState({});
	const [matchModalShow, setMatchModalShow] = useState(false);

	const {
		data, loading, refetch,
		balanceRefetch, accountData, accountLoading, query,
	} = useGetDocumentList({
		filters,
		sorting,
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
		if (data && data?.list.length > EMPTY_DATA_LENGTH) {
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
				<EmptyState height={315} width={482} Text={Text} />
			</div>
		);
	}

	useEffect(() => {
		refetch();
		balanceRefetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(restfilters), query]);
	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sorting, query]);
	useEffect(() => {
		const selectedIds = new Set(selectedData.map((row) => row.id));

		const UPDATEDPAGECHECKEDROWS = {};
		Object.keys(pageCheckedRows).forEach((pageNo) => {
			UPDATEDPAGECHECKEDROWS[pageNo] = pageCheckedRows[pageNo].filter((id) => selectedIds.has(id));
		});

		setPageCheckedRows(UPDATEDPAGECHECKEDROWS);

		const total = selectedData.reduce((sum, item) => +sum + +item.balanceAmount
		* +item.exchangeRate * item.signFlag, INITIAL_MAT_BAL);
		setMatchBal(total);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedData]);

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
				: DataRender()

}
			<Amount
				data={accountData}
				loading={accountLoading}
				selectedData={selectedData}
				matchModalShow={matchModalShow}
				setMatchModalShow={setMatchModalShow}
				totalMatchingBalance={totalMatchingBalance}
				matchBal={matchBal}
				setMatchBal={setMatchBal}
				filters={filters}
			/>
			{matchModalShow ? (
				<MatchModal
					matchModalShow={matchModalShow}
					setMatchModalShow={setMatchModalShow}
					totalMatchingBalance={totalMatchingBalance}
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
				/>
			) : null}
		</div>

	);
}

export default ApArSettlement;
