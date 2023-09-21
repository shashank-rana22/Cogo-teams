import EmptyState from '@cogoport/air-modules/common/EmptyState';
import { isEmpty } from '@cogoport/utils';

import Header from './CardHeader';
import CardItem from './Carditem';
import styles from './styles.module.css';

function List({ fields = [], data = [] }) {
	return (
		<div className={styles.container}>
			<Header fields={fields} />

			<div className={styles.card_list}>
				{!isEmpty(data) ? (
					(data || []).map((item) => {
						const { code = '', name = '', units = [], service_type = '' } = item || {};

						return (
							<CardItem
								key={code + name + JSON.stringify(units) + service_type}
								item={item}
								fields={fields}
							/>
						);
					})
				) : (
					<EmptyState />
				)}
			</div>
		</div>
	);
}

export default List;
