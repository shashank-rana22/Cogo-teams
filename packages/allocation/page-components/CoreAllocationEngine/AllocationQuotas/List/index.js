import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';

import ListItem from './ListItem';
// import ListItem from './ListItem';
import styles from './styles.module.css';

function List(props) {
	const {
		data,
		toggleRoleType,
		loading,
		onChangeParams,
		setQuotaItem,
	} = props;
	const { list, page = 0, page_limit: pageLimit = 0, total_count = 0 } = data || {};

	//  delete hook

	if (loading) {
		return 'Loading...';
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

	// const showStatusConfirmationModal = !isEmpty(deleteQuotaId);

	// const onCloseModal = () => {
	// 	setRequestStatusItem({});
	// };

	return (
		<div className={styles.list_container}>
			{list.map((item) => (
				<ListItem
					id="request_list"
					key={item.id}
					data={item}
					toggleRoleType={toggleRoleType}
					onClickActionItem={(action) => setQuotaItem({
						...(action === 'edit' && item),
						id: item.id,
						action,
					})}
					// showModal={showDeleteConfirmationModal}
					// onClickDelete={() => {
					// }}
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

			{/* {showStatusConfirmationModal ? (
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
								onClick={onDelete}
								loading={loadingUpdate}
							>
								Yes, I do
							</Button>
						</div>
					</div>
				</Modal>
			) : null} */}
		</div>

	);
}

export default List;
