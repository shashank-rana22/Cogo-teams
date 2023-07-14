import { Pagination } from '@cogoport/components';
import React from 'react';

import EmptyState from '../../../../commons/EmptyState';
import Loader from '../../../../commons/Loader';

import CardComponent from './CardComponent';
import styles from './styles.module.css';

const paginationLength = 9;

function ListComponent({ data, loading, filters, setFilters, refetchBookingList }) {
	if (loading) {
		return [...Array(10).keys()].map((value) => <Loader key={value} />);
	}

	if (!(data?.list || []).length && !loading) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>

			{ (data?.list || []).map((item) => (
				<CardComponent
					key={item.id}
					item={item}
					filters={filters}
					refetchBookingList={refetchBookingList}
				/>
			))}

			{data?.list?.length > paginationLength ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={data?.page}
						totalItems={data?.total_count}
						pageSize={10}
						onPageChange={(val) => {
							setFilters({ ...filters, page: val });
						}}
					/>
				</div>
			) : null}
		</div>
	);
}

export default ListComponent;
