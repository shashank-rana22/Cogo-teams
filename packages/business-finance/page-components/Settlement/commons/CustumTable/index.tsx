import { Pagination } from '@cogoport/components';
import React from 'react';

import Loader from '../../page-components/Loader';

import Header from './Header';
import List from './List';
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
	refetch:()=>void;
}

function CustumTable({ data = {}, onPageChange, loading, refetch }:Props) {
	const { list = [], pageNo = 1, totalRecords = 0 } = (data as DataInterface || {});
	return (
		<div className={styles.table}>
			<Header />
			{loading ? <Loader /> : <List list={list} refetch={refetch} /> }
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

export default CustumTable;
