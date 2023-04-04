import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';

import styles from './styles.module.css';

function List(props) {
	const {
		columns = [],
		onPageChange = () => {},
		data,
		loading = false,

	} = props;

	const { list, page = 0, page_limit = 0, total_count = 0 } = data || {};

	if (isEmpty(list) && !loading) {
		return (
			<div className={styles.empty}>
				<EmptyState height="300px" width="200px" />
			</div>

		);
	}

	return (
		<div>
			<Table
				className={styles.table}
				columns={columns}
				data={list || []}
				loading={loading}
			/>

			{total_count > page_limit && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={onPageChange}
					/>
				</div>
			)}
		</div>
	);
}

export default List;
