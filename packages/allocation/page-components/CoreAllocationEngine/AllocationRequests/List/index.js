import { Button, Modal, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

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
	const { data, loading, onChangeParams, fetchList } = props;
	const { list, page = 0, page_limit: pageLimit = 0, total_count = 0 } = data || {};

	const {
		onStatusUpdate,
		loadingUpdate,
		requestStatusItem,
		setRequestStatusItem,
	} = useUpdateRequestStatus({ fetchList });

	if (loading) {
		return 'Loading...';
	}

	if (isEmpty(list)) {
		return 'Empty';
	}

	const showStatusConfirmationModal = !isEmpty(requestStatusItem);

	const onCloseModal = () => {
		setRequestStatusItem({});
	};

	return (
		<div>
			{list.map((item) => (
				<ListItem
					id="request_list"
					key={item.id}
					data={item}
					showModal={showStatusConfirmationModal}
					onClickStatusChange={({ status }) => {
						setRequestStatusItem({
							status,
							allocation_request_id: item.id,
						});
					}}
				/>
			))}

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
					<div className={styles.status_change_container}>

						<Modal.Header
							title={`Are you sure you want to
						 	${STATUS_MAPPING[requestStatusItem.status].label || 'update'} 
							this request ?`}
						/>

						<div className={styles.btn_container}>
							<Button
								size="md"
								themeType="primary"
								onClick={onStatusUpdate}
								loading={loadingUpdate}
							>
								Yes, I do
							</Button>
						</div>
					</div>
				</Modal>
			) : null}
		</div>

	);
}

export default List;
