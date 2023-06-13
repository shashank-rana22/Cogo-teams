import { Pagination } from '@cogoport/components';
import React from 'react';

import Loader from '../../Loader/index';

import Header from './Header';
import ListData from './ListData';
import styles from './styles.module.css';

interface ListItem {
	id: string;
	jvNum: string;
	category: string;
	transactionDate: string;
	currency: string;
	entityCode: string;
	jvCodeNum: string;
	exchangeRate: string;
	ledCurrency: string;
	status: string;
}

interface DataInterface {
	list: ListItem[],
	pageNo: number,
	totalRecords: number,
}

interface Props {
	data: DataInterface | {};
	onPageChange: (val: number) => void;
	loading: boolean;
	refetch: () => void;
	setFilters: React.Dispatch<React.SetStateAction<{}>>;
	filters: { sortType?: string };
}

function CustomTable({ data = {}, onPageChange, loading, refetch, setFilters, filters }:Props) {
	const { list = [], pageNo = 1, totalRecords = 0 } = (data as DataInterface || {});
	return (
		<div className={styles.table}>
			<Header setFilters={setFilters} filters={filters} />
			{loading ? <Loader /> : <ListData list={list} refetch={refetch} /> }
			<Pagination
				className={styles.pagination}
				type="number"
				currentPage={pageNo}
				totalItems={totalRecords}
				pageSize={10}
				onPageChange={onPageChange}
			/>
		</div>
	);
}

export default CustomTable;
