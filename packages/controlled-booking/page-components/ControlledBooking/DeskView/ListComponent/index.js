import { Pagination } from '@cogoport/components';
import React from 'react';

import EmptyState from '../../../../commons/EmptyState';
import Loader from '../../../../commons/Loader';

import Card from './Card';
import styles from './styles.module.css';

function ListComponent({ data, loading, filters, setFilters, refetchBookingList }) {
	if (loading) {
		return [...Array(10)].map(() => <Loader />);
	}

	if (!(data?.list || []).length && !loading) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			{(data?.list || []).map((item) => <Card key={item.id} item={item} filters={filters} refetchBookingList={refetchBookingList} />)}

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
		</div>
	);
}

export default ListComponent;
