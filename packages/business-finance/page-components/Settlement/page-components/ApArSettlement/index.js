import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
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

function ApArSettlement() {
	const { t = () => {} } = useTranslation(['settlement']);
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

	const [fromCreateJv, setFromCreateJv] = useState(false);

	const [jvSearch, setJvSearch] = useState('');
	const [sorting, setSorting] = useState({
		sortType: 'Asc',
	});

	const TEXT = 	(filters?.entityCode && filters?.tradeParty)
		? t('settlement:empty_data_in_filters_message')
		: t('settlement:select_filters_message');

	const [selectedData, setSelectedData] = useState([]);
	const [matchBal, setMatchBal] = useState(INITIAL_MAT_BAL);
	const [reRender, setReRender] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [pageCheckedRows, setPageCheckedRows] = useState({});
	const [matchModalShow, setMatchModalShow] = useState(false);

	const {
		data = [], loading = false, accountData = [], accountLoading = false,
		submitSettleMatch = () => {}, refetch = () => {},
		settleLoading = false,
	} = useGetDocumentList({
		filters,
		sorting,
		setMatchModalShow,
		setSelectedData,
		t,
		setFromCreateJv,
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

		const TOTAL = selectedData.reduce((sum, item) => {
			const balanceAmount = +item.balanceAmount || INITIAL_MAT_BAL;
			const exchangeRate = +item.exchangeRate || INITIAL_MAT_BAL;
			const signFlag = +item.signFlag || INITIAL_MAT_BAL;
			const itemTotal = balanceAmount * exchangeRate * signFlag;

			return sum + itemTotal;
		}, INITIAL_MAT_BAL);
		setMatchBal(TOTAL);
	}, [selectedData, pageCheckedRowsStringfy]);

	useEffect(() => {
		if (fromCreateJv) {
			const updatedSelectedData = [...(selectedData || []), ...(data.list || [])];
			setSelectedData(updatedSelectedData);
			setFromCreateJv(false);
		}
	}, [data?.list, fromCreateJv, selectedData]);

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
				jvSearch={jvSearch}
				setJvSearch={setJvSearch}
			/>
			{
				(isEmpty(data?.list) && !loading)
					? (
						<>
							<div className={styles.empty_container}>
								<EmptyState height={315} width={482} text={TEXT} />
							</div>
							<div style={{ height: '80px' }} />
						</>
					)
					: (
						<>
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
							<div style={{ height: '80px' }} />
						</>
					)
			}
			<Amount
				data={accountData}
				loading={accountLoading}
				selectedData={selectedData}
				matchModalShow={matchModalShow}
				setMatchModalShow={setMatchModalShow}
				matchBal={matchBal}
				setMatchBal={setMatchBal}
				filters={filters}
				dataLoading={loading}
			/>
			{matchModalShow ? (
				<MatchModal
					matchModalShow={matchModalShow}
					setMatchModalShow={setMatchModalShow}
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
					refetch={refetch}
					setJvSearch={setJvSearch}
				/>
			) : null}
		</div>

	);
}

export default ApArSettlement;
