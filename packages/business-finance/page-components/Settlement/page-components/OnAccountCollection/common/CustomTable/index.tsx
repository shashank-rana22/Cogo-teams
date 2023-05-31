import { Pagination } from '@cogoport/components';
import React from 'react';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

interface GlobalInterface {
	page?:number
	pageLimit?:number
	accMode?:string
	search?:string
	date?:{
		startDate?:Date
		endDate?:Date
	}
	paymentDocumentStatus?:string
	docType?:string
	sortBy?: string,
	sortType?: string,
}
interface CustomInterface {
	data?:{
		list?:Array<object>
		page?:number
		totalRecords?:number
	}
	onPageChange?:(val: number) => void
	refetch?:Function
	loading?:boolean
	globalFilters?: GlobalInterface
	setGlobalFilters?: React.Dispatch<React.SetStateAction<GlobalInterface>>
}
function CustomTable({
	data = {}, onPageChange, refetch, loading, setGlobalFilters,
	globalFilters,
}:CustomInterface) {
	const { list = [], page = 1, totalRecords = 0 } = data;
	return (
		<div className={styles.table}>
			<Header setGlobalFilters={setGlobalFilters} globalFilters={globalFilters} />
			<List list={list} refetch={refetch} loading={loading} />
			<Pagination
				className={styles.pagination}
				currentPage={page}
				totalItems={totalRecords}
				pageSize={10}
				onPageChange={onPageChange}
			/>
		</div>
	);
}

export default CustomTable;
