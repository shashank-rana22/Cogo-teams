import { Pagination } from '@cogoport/components';

import Card from './Card';
import styles from './styles.module.css';

function List({
	feedbacks = [],
	page = 1,
	setPage = () => {},
	total = '',
}) {
	return (
		<div className={styles.list}>
			<div className={styles.scroll_view}>
				{(feedbacks || []).map((item) => <Card key={item?.ID} {...item} />)}
			</div>

			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total}
					pageSize={10}
					onPageChange={(val) => setPage(val)}
				/>
			</div>
		</div>
	);
}

export default List;
