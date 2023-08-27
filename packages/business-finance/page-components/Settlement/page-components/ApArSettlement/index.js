// import { useDebounceQuery } from '@cogoport/forms';
// import { isEmpty } from '@cogoport/utils/dist/types';
// import { isEmpty, PlaceHolder } from '@cogoport/components';
// import { Placeholder } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

// import ReceivablesPayablesSettlement from './ReceivablesPayablesSettlement';
import EmptyState from '../../commons/EmptyState';
import useGetDocumentList from '../../hooks/useGetDocumentList';

import Amount from './Amount';
import DocList from './DocList';
import Filters from './Filters';
import MatchModal from './MatchModal';
// import { SearchResults } from './SearchFilters';
import { SearchFilters } from './SearchFilters';
import styles from './styles.module.css';

function ApArSettlement() {
	// const [docType, setDocType] = useState('');
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

	// const [arrowDirections, setArrowDirections] = useState(initialArrowDirections);

	const onPageChange = (val) => {
		setFilters((prev) => ({ ...prev, page: val }));
	};
	const [selectedData, setSelectedData] = useState([]);
	const [pageCheckedRows, setPageCheckedRows] = useState({});
	const [matchModalShow, setMatchModalShow] = useState(false);
	// const { query = '', debounceQuery } = useDebounceQuery();
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
	// const handleDocTypeChange = (value) => {
	// 	setDocType(value);
	// };
	//   console.log(filters);
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
				// arrowDirections={arrowDirections}
				// setArrowDirections={setArrowDirections}
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
		// balanceRefetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sorting]);
	// console.log('happy');
	useEffect(() => {
		// Create a set of selected IDs for quick lookups
		const selectedIds = new Set(selectedData.map((row) => row.id));

		// Filter out IDs that are not in selectedData
		const UPDATEDPAGECHECKEDROWS = {};
		Object.keys(pageCheckedRows).forEach((pageNo) => {
			UPDATEDPAGECHECKEDROWS[pageNo] = pageCheckedRows[pageNo].filter((id) => selectedIds.has(id));
		});

		setPageCheckedRows(UPDATEDPAGECHECKEDROWS);
		console.log('p', pageCheckedRows);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedData]);
	// console.log(selectedData);

	// useEffect(() => {
	// 	debounceQuery(filters?.query);
	// }, [debounceQuery, filters?.query]);
	// console.log(accountData.onAccountAmount);
	// console.log(data?.list.length);

	return (
		<div>
			<Filters filters={filters} onFiltersChange={handleFilterChange} loading={loading} />
			<SearchFilters
				// docType={docType}
				// onDocTypeChange={handleDocTypeChange}
				filters={filters}
				onFiltersChange={handleFilterChange}
				loading={loading}

			/>
			{

			loading ? (
				<div>
					{/* <Placeholder>
						Please wait while Loading
					</Placeholder> */}
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
					// arrowDirections={arrowDirections}
					// setArrowDirections={setArrowDirections}
						setSortData={setSorting}
						sortData={sorting}
					/>
				</div>
			)
				: DataRender()

				// : (data && data?.list.length > 0 ? (
				// // Render your docList component here
				// // <DocList data={data} />
				// 	<DocList
				// 		data={data}
				// 		loading={loading}
				// 		onPageChange={onPageChange}
				// 		selectedData={selectedData}
				// 		setSelectedData={setSelectedData}
				// 		sortBy={sortBy}
				// 		setSortBy={setSortBy}
				// 		sortType={sortType}
				// 		setSortType={setSortType}
				// 	// arrowDirections={arrowDirections}
				// 	// setArrowDirections={setArrowDirections}
				// 		setSortData={setSorting}
				// 		sortData={sorting}
				// 	/>
				// ) : (
				// // Render the EmptyState component here
				// 	<div className={styles.emptycontainer}>
				// 		<EmptyState height={315} width={482} Text={Text} />
				// 	</div>

				// )
				// )
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
			<MatchModal
				matchModalShow={matchModalShow}
				setMatchModalShow={setMatchModalShow}
				totalMatchingBalance={totalMatchingBalance}
				selectedData={selectedData}
				setSelectedData={setSelectedData}
				loading={loading}
			/>
		</div>

	);
}

export default ApArSettlement;
