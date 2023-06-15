import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyStateDocs from '../../../../commons/EmptyStateDocs';
import Loader from '../../Loader/index';
import SelectState from '../SelectState';

import Header from './Header';
import ListData from './ListData';
import styles from './styles.module.css';

interface ListItem {
	id: string;
	documentValue: string;
	documentAmount: number;
	settledAmount: number;
	balanceAmount: number;
	transactionDate: string;
	lastEditedDate: string;
	currency: string;
	documentNo: string;
	accountType: string;
	accMode: string;
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

	// if (isEmpty(list)) {
	// 	return (
	// 		<SelectState />
	// 	);
	// }
	return (
		<div className={styles.table}>
			<Header setFilters={setFilters} filters={filters} />
			{loading ? <Loader /> : <ListData list={list} refetch={refetch} /> }
			{	!isEmpty(list)
				? (
					<Pagination
						className={styles.pagination}
						type="number"
						currentPage={pageNo}
						totalItems={totalRecords}
						pageSize={10}
						onPageChange={onPageChange}
					/>
				) : null}
		</div>
	);
}

export default CustomTable;
