import { Table, Pagination } from '@cogoport/components';
// import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';
import TableColumns from './TableColumns';

function List({
	list = [],
	loading = false,
	page,
	page_limit,
	total_count,
	setPagination = () => {},
}) {
	return (
		<div className={styles.container}>
			{isEmpty(list) && !loading ? (
				<figure className={styles.empty_state}>
					{/* <Image
						src={LIST_EMPTY_STATE}
						alt="Empty State"
						width={300}
						height={250}
					/> */}
					<figcaption
						className={styles.empty_state_text}
					>
						No Data Found
					</figcaption>
				</figure>
			) : (

				<Table
					className={styles.table_container}
					columns={TableColumns()}
					data={list || []}
					loading={loading}
					loadingRowsCount={10}
				/>
			)}
			<Pagination
				type="table"
				className={styles.pagination_container}
				currentPage={page || 0}
				totalItems={total_count || 0}
				pageSize={page_limit || 10}
				onPageChange={setPagination}
			/>
		</div>
	);
}

export default List;
