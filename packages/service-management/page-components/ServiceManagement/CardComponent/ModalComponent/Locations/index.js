import { isEmpty } from '@cogoport/utils';
import { v1 as uuid } from 'uuid';

import styles from './styles.module.css';

function Locations({ locations = [] }) {
	if (isEmpty(locations)) {
		return <div className={styles.empty_state}>No Locations Added</div>;
	}

	return (
		<div>
			{locations?.map((location, index) => (
				<div key={`${`${index}${uuid()}`}`}>
					<div className={styles.content}>
						<div className={styles.port}>
							{location?.location?.name}
							{' '}
						</div>
						<div className={styles.port}>
							{' '}
							{location?.trade_type}
						</div>
					</div>

				</div>
			))}
		</div>
	);
}

export default Locations;
