import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import ConfigurationDetails from '../ConfigurationDetails';

import styles from './styles.module.css';
import UpdateStakeholderDetails from './UpdateStakeholderDetails';

function List({
	list,
	loading,
	paginationData,
	getNextaPage,
	configurationDetails,
	listRefetch,
	columns,
	stakeholderDetail,
	setStakeholderDetail,
}) {
	if (!loading && isEmpty(list)) {
		return (
			<div className={styles.emptystate}>
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

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	return (
		<div className={styles.list_container}>
			<ConfigurationDetails configurationDetails={configurationDetails} />

			<div className={styles.table_container}>
				<Table
					className={styles.table}
					columns={columns}
					data={list}
					loading={loading}
				/>
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextaPage}
				/>
			</div>

			{!isEmpty(stakeholderDetail) ? (
				<UpdateStakeholderDetails
					stakeholderDetail={stakeholderDetail}
					setStakeholderDetail={setStakeholderDetail}
					listRefetch={listRefetch}
				/>
			) : null}
		</div>
	);
}

export default List;
