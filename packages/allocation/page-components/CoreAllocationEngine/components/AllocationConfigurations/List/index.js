import { Modal, Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import CONFIGURATIONS_WORKFLOW_MAPPING from '../../../constants/configurations-workflow-mapping';

import styles from './styles.module.css';

function List(props) {
	const {
		list,
		loading,
		listRefetch,
		paginationData,
		getNextPage,
		columns,
		listItem,
		workflowName,
		setWorkflowName,
	} = props;

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

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

	return (
		<section className={styles.list_container}>
			<div className={styles.table_container}>
				<Table
					className={styles.table}
					columns={columns}
					data={list || []}
					loading={loading}
				/>
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>

			{workflowName && (
				<Modal
					size={CONFIGURATIONS_WORKFLOW_MAPPING[workflowName]?.size}
					show={!!workflowName}
					onClose={() => setWorkflowName(null)}
					placement="top"
					closeOnOuterClick={false}
				>
					{CONFIGURATIONS_WORKFLOW_MAPPING[workflowName]
						?.render({ item: listItem, listRefetch, setWorkflowName })}
				</Modal>
			)}
		</section>
	);
}

export default List;
