import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import LoadingState from '../../../../common/LoadingState';

import ListItem from './ListItem';
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
		return <LoadingState />;
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
		</div>

	);
}

export default List;
