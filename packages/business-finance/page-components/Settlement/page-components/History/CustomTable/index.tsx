import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Loader from '../../Loader/index';
import FooterCard from '../FooterCard';

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
	notPostedSettlementIds : Array<number>;
	ledCurrency: string;
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
	setFilters: React.Dispatch<React.SetStateAction<{}>>;
	filters: { sortType?: string };
	isAllChecked: boolean;
	showHeaderCheckbox: boolean;
	onChangeTableHeaderCheckbox: (event: object) => void;
	checkedRows: Object;
	getTableBodyCheckbox: (item: object) => React.JSX.Element;
}

function CustomTable({
	data = {}, onPageChange, loading, setFilters, filters,
	getTableBodyCheckbox, isAllChecked, onChangeTableHeaderCheckbox,
	showHeaderCheckbox, checkedRows,
}:Props) {
	const { list = [], pageNo = 1, totalRecords = 0 } = (data as DataInterface || {});

	return (
		<div className={styles.table}>
			<Header
				setFilters={setFilters}
				filters={filters}
				isAllChecked={isAllChecked}
				onChangeTableHeaderCheckbox={onChangeTableHeaderCheckbox}
				showHeaderCheckbox={showHeaderCheckbox}
				loading={loading}
			/>
			{loading ? <Loader /> : <ListData list={list} getTableBodyCheckbox={getTableBodyCheckbox} /> }
			{!isEmpty(list)
				? (
					<>
						<Pagination
							className={styles.pagination}
							type="number"
							currentPage={pageNo}
							totalItems={totalRecords}
							pageSize={10}
							onPageChange={onPageChange}
						/>
						<FooterCard checkedRows={checkedRows} />
					</>

				) : null}
		</div>
	);
}

export default CustomTable;
