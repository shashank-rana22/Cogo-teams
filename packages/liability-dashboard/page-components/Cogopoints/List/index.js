import { Table, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
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
					<Image
						src={GLOBAL_CONSTANTS.image_url.empty_state}
						alt="Empty State"
						width={200}
						height={250}
					/>
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
