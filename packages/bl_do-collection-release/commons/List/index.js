import { Pagination } from '@cogoport/components';

import Card from '../Card';
import EmptyState from '../EmptyState';

import styles from './styles.module.css';

export default function List({ data = {}, stateProps, couldBeCardsCritical = false, setStateProps = () => {} }) {
	const { activeTab } = stateProps;
	const { list = [], total } = data;

	return (
		list.length === 0 ? <EmptyState /> : (
			<div className={styles.container}>
				<div className={styles.list_container}>
					{list.map((item) => (
						<Card
							key={item?.id}
							item={item}
							stateProps={stateProps}
							couldBeCardsCritical={couldBeCardsCritical}
							activeTab={activeTab}
						/>
					))}

					<div className={styles.pagination_container}>
						<Pagination
							type="number"
							totalItems={total}
							pageSize={10}
						/>
					</div>
				</div>
			</div>
		)
	);
}
