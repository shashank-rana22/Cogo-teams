import { Button, Modal, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import ShimmerState from '../../../../common/ShimmerState';
import useUpdateRequestStatus from '../../../../hooks/useUpdateAllocationRequest';

import ListItem from './ListItem';
import styles from './styles.module.css';

const STATUS_MAPPING = {
	approved: {
		label: 'Approve',
	},
	rejected: {
		label: 'Reject',
	},
};

function List(props) {
	const {
		data,
		loading,
		onChangeParams,
		fetchList,
		bulkMode,
		checkedRowsId,
		setCheckedRowsId,
	} = props;
	const { list, page = 0, page_limit: pageLimit = 0, total_count = 0 } = data || {};

	const {
		onStatusUpdate,
		loadingUpdate,
		requestStatusItem,
		setRequestStatusItem,
	} = useUpdateRequestStatus({ fetchList });

	if (loading) {
		return <ShimmerState />;
	}

	if (isEmpty(list)) {
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
			{list.map((item) => {
				const itemId = item.id;
				const isSelected = bulkMode && checkedRowsId.includes(itemId);

				return (
					<ListItem
						id="request_list"
						key={itemId}
						data={item}
						showModal={showStatusConfirmationModal}
						onClickStatusChange={({ status }) => {
							setRequestStatusItem({
								status,
								allocation_request_id: item.id,
							});
						}}
						isSelectable={bulkMode}
						isSelected={bulkMode && checkedRowsId.includes(itemId)}
						onCardClick={() => {
							if (bulkMode) {
								if (!isSelected) {
									setCheckedRowsId([...checkedRowsId, itemId]);
								} else {
									setCheckedRowsId(checkedRowsId.filter((id) => id !== itemId));
								}
							}
						}}
					/>
				);
			})}

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
