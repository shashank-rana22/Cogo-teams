import { Table, Button, Modal, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import STATUS_MAPPING from '../../../constants/requests-status-mapping';
import useUpdateRequestStatus from '../../../hooks/useUpdateAllocationRequest';

import styles from './styles.module.css';

function List(props) {
	const {
		data,
		columns,
		loading,
		onChangeParams,
		fetchList,
		requestStatusItem,
		setRequestStatusItem,
	} = props;
	const { list, page = 0, page_limit: pageLimit = 0, total_count = 0 } = data || {};

	const {
		onStatusUpdate,
		loadingUpdate,
	} = useUpdateRequestStatus({ fetchList, setRequestStatusItem, requestStatusItem });

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

	const showStatusConfirmationModal = !isEmpty(requestStatusItem);

	const onCloseModal = () => {
		setRequestStatusItem({});
	};

	return (
		<div>
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
					pageSize={pageLimit}
					onPageChange={(val) => onChangeParams({ page: val })}
				/>
			</div>

			{showStatusConfirmationModal ? (
				<Modal
					size="md"
					show={showStatusConfirmationModal}
					onClose={onCloseModal}
					onOuterClick={onCloseModal}
					placement="top"
				>
					<div>
						<Modal.Header
							title="Update Status"
						/>

						<Modal.Body>
							Are you sure you want to
							{' '}
							{STATUS_MAPPING[requestStatusItem.status].label || 'update'}
							{' '}
							this request ?
						</Modal.Body>

						<Modal.Footer>
							<Button
								size="md"
								themeType="primary"
								onClick={onStatusUpdate}
								loading={loadingUpdate}
							>
								Yes, I do
							</Button>
						</Modal.Footer>
					</div>
				</Modal>
			) : null}
		</div>

	);
}

export default List;
