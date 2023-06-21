import EmptyState from '@cogoport/ocean-modules/common/EmptyState';

import Header from './CardHeader';
import CardItem from './Carditem';
import styles from './styles.module.css';

function List({ fields, data, loading }) {
	return (
		<div className={styles.container}>
			<Header fields={fields} />
			<div className={styles.card_list}>
				{data.length ? (
					(data || []).map((item) => (
						<CardItem item={item} loading={loading} fields={fields} key={item?.id} />
					))
				) : (
					<EmptyState />
				)}
			</div>
		</div>
	);
}

export default List;
