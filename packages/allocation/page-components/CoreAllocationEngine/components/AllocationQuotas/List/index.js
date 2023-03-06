import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import ROLE_TYPE_LIST_MAPPING from '../../../constants/role-type-list-mapping-quotas';

import styles from './styles.module.css';

function List(props) {
	const {
		data,
		columns,
		toggleRoleType,
		loading,
		getNextPage,
	} = props;
	const { list, page = 0, page_limit: pageLimit = 0, total_count = 0 } = data || {};

	if (isEmpty(list) && !loading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={280}
					width={440}
					emptyText="No records found"
					textSize="24px"
					flexDirection="column"
				/>
			</div>
		);
	}

	const filteredColumns = columns.filter((listItem) => (
		ROLE_TYPE_LIST_MAPPING[toggleRoleType]?.includes(listItem.key)
	));

	return (
		<section>
			<div className={styles.table_container}>
				<Table
					className={styles.table}
					columns={filteredColumns}
					data={list || []}
					loading={loading}
				/>
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={pageLimit}
					onPageChange={getNextPage}
				/>
			</div>
		</section>
	);
}

export default List;
