import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
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
	refetch: () => void;
	setFilters: React.Dispatch<React.SetStateAction<{}>>;
	filters: { sortType?: string };
}

const PAGE_SIZE = 10;

function CustumTable({ data = {}, onPageChange, loading, refetch, setFilters, filters }:Props) {
	const { list = [], pageNo = 1, totalRecords = 0 } = (data as DataInterface || {});

	return (
		<div className={styles.table}>
			<Header setFilters={setFilters} filters={filters} />
			{loading ? <Loader /> : <List list={list} refetch={refetch} /> }
			{ isEmpty(list) ? null : (
				<Pagination
					className={styles.pagination}
					type="number"
					currentPage={pageNo}
					totalItems={totalRecords}
					pageSize={PAGE_SIZE}
					onPageChange={onPageChange}
				/>
			) }

		</div>
	);
}

export default CustumTable;
