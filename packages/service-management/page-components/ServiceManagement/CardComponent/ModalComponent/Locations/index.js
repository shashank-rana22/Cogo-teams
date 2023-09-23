import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Locations({ locations = [] }) {
	if (isEmpty(locations)) {
		return <div className={styles.empty_state}>No Locations Added</div>;
	}
	console.log({ locations });
	return (
		<div>
			{locations?.map((location) => (
				<div className={styles.content} key={location}>
					<div className={styles.port}>
						{location?.location?.name}
						{' '}
					</div>
					<div className={styles.port}>
						{' '}
						{location?.trade_type}
					</div>
				</div>
			))}
		</div>
	);
}

export default Locations;
