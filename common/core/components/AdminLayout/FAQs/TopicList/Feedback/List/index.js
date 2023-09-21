import { isEmpty } from '@cogoport/utils';

import Card from './Card';
import Empty from './Empty';
import Loader from './Loader';
import styles from './styles.module.css';

function List({
	feedbacks = [],
	loading = false,
}) {
	if (loading) {
		return <Loader count={4} />;
	}

	if (isEmpty(feedbacks)) {
		return <Empty />;
	}

	return (
		<div className={styles.list}>
			<div className={styles.scroll_view}>
				{(feedbacks || []).map((item) => <Card key={item?.ID} {...item} />)}
			</div>

		</div>
	);
}

export default List;
