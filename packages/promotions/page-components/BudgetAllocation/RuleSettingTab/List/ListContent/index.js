import { Loader, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';

import ListItem from './ListItem';
import styles from './styles.module.css';

const ZERO_PAGES = 0;

function ListContent({
	data = {},
	loading = {},
	filters = {},
	setFilters = () => {},
	activeList = '',
	refetchList = () => {},
	setViewAndEditRuleId = () => {},
}) {
	const { list = [], page_limit = 10, total_count = 1 } = data || {};
	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader themeType="primary" />
			</div>
		);
	}

	if (isEmpty(list) && !loading) {
		return <EmptyState />;
	}
	const { page, ...restFilters } = filters || {};
	const onPageClick = (currentPage) => {
		setFilters({ ...restFilters, page: currentPage });
	};
	return (
		<div className={styles.container}>
			<div className={styles.pagination}>
				<Pagination
					type="table"
					pageSize={page_limit}
					totalItems={total_count || ZERO_PAGES}
					currentPage={page}
					onPageChange={onPageClick}
				/>
			</div>

			{list?.map((item) => (
				<ListItem
					key={item.id}
					data={item}
					loading={loading}
					activeList={activeList}
					refetchList={refetchList}
					setViewAndEditRuleId={setViewAndEditRuleId}
				/>
			))}
			<div className={styles.pagination}>
				<Pagination
					type="table"
					pageSize={page_limit}
					totalItems={total_count || ZERO_PAGES}
					currentPage={page}
					onPageChange={onPageClick}
				/>
			</div>
		</div>
	);
}

export default ListContent;
