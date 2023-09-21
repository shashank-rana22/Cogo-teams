import { Loader, Pagination } from '@cogoport/components';
// import { useRouter } from '@cogoport/next';

import EmptyState from '../../../../../common/EmptyState';

// import ListItem from './ListItem';
import styles from './styles.module.css';

const ZERO_PAGES = 0;
// const LAST_INDEX = 1;

function ListContent({
	data = {},
	loading = {},
	filters = {},
	setFilters = () => {},
	// activeService = '',
}) {
	// const router = useRouter();
	const { list, page_limit = 10, total_count = 1 } = data || {};
	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader themeType="primary" />
			</div>
		);
	}

	if (!(list || []).length && !loading) {
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

			{/* {list?.map((item, i) => (
                <ListItem
                    key={item.id}
                    data={item}
                    loading={loading}
                    isLastItem={i === list.length - LAST_INDEX}
                    total={total_count || ZERO_PAGES}
                    onEdit={() => {
                        router.push(
                            `/convenience-rates/[convenience_rate_id]?service=${activeService}`,
                            `/convenience-rates/${item?.id}?service=${activeService}`
                        );
                    }}
                />
            ))} */}
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
