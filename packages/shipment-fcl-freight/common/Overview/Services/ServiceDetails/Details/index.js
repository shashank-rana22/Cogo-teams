import { getByKey } from '@cogoport/utils';

import Item from './Item';
import styles from './styles.module.css';

function Details({ state = '', serviceItemsKey = [], service_data = {} }) {
	return (
		<div className={styles.container}>
			{(serviceItemsKey || []).map((element) => (getByKey(service_data, element.key) ? (
				<Item state={state} label={element} detail={service_data} />
			) : null))}
		</div>
	);
}

export default Details;
