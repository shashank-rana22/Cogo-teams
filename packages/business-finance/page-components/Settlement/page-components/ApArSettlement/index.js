import React, { useState, useEffect } from 'react';

import EmptyState from '../../commons/EmptyState';
import useGetDocumentList from '../../hooks/useGetDocumentList';

import Amount from './Amount';
import DocList from './DocList';
import Filters from './Filters';
import MatchModal from './MatchModal';
import { SearchFilters } from './SearchFilters';
import styles from './styles.module.css';

function ApArSettlement() {
	const [filters, setFilters] = useState({
		entityCode : '',
		date       : { startDate: null, endDate: null },
		tradeParty : '',
		accMode    : '',
		sort       : {},
		query      : '',
		page       : 1,
		pageLimit  : 10,
		docType    : '',
		status     : '',
	});

	const [sorting, setSorting] = useState({
		sortType: 'Asc',
	});

	const [sortBy, setSortBy] = useState('');

	const [sortType, setSortType] = useState('');

	const Text = 	(filters?.entityCode && filters?.tradeParty)
		? 'Looks like you do not have any data in this category'
		: 'Select filters to find what you\'re looking for';

	const onPageChange = (val) => {
		setFilters((prev) => ({ ...prev, page: val }));
	};

	const [selectedData, setSelectedData] = useState([]);
	const [reRender, setReRender] = useState(false);

	const [pageCheckedRows, setPageCheckedRows] = useState({});
	const [matchModalShow, setMatchModalShow] = useState(false);
	const {
		data, loading, refetch,
		balanceRefetch, accountData, accountLoading,
	} = useGetDocumentList({ filters, sortBy, sortType, sorting });

	const handleFilterChange = (filterName, value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterName] : value,
			page         : 1,
		}));
	};
	const INITIAL_MAT_BAL = 0;
	const EMPTY_DATA_LENGTH = 0;
	const totalMatchingBalance = selectedData.reduce((sum, item) => sum + item.balanceAmount, INITIAL_MAT_BAL);
	function DataRender() {
		if (data && data?.list.length > EMPTY_DATA_LENGTH) {
			return (
				<DocList
					data={data}
					loading={loading}
					onPageChange={onPageChange}
					selectedData={selectedData}
					setSelectedData={setSelectedData}
					sortBy={sortBy}
					setSortBy={setSortBy}
					sortType={sortType}
					setSortType={setSortType}
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
	}, [filters]);
	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sorting]);
	useEffect(() => {
		const selectedIds = new Set(selectedData.map((row) => row.id));

		const UPDATEDPAGECHECKEDROWS = {};
		Object.keys(pageCheckedRows).forEach((pageNo) => {
			UPDATEDPAGECHECKEDROWS[pageNo] = pageCheckedRows[pageNo].filter((id) => selectedIds.has(id));
		});

		setPageCheckedRows(UPDATEDPAGECHECKEDROWS);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedData]);

	return (
		<div>
			<Filters filters={filters} onFiltersChange={handleFilterChange} loading={loading} />
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
						sortBy={sortBy}
						setSortBy={setSortBy}
						sortType={sortType}
						setSortType={setSortType}
						setSortData={setSorting}
						sortData={sorting}
					/>
				</div>
			)
				: DataRender()

}
			<Amount
				data={accountData}
				loading={accountLoading}
				selectedData={selectedData}
				setSelectedData={setSelectedData}
				matchModalShow={matchModalShow}
				setMatchModalShow={setMatchModalShow}
				totalMatchingBalance={totalMatchingBalance}
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
				/>
			) : null}
		</div>

	);
}

export default ApArSettlement;
