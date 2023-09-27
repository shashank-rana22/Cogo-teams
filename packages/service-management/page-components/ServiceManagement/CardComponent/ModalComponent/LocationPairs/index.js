import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function LocationPairs({ locationPairs = [] }) {
	if (isEmpty(locationPairs)) {
		return <div className={styles.empty_state}>No Location Pairs Added</div>;
	}

	return (
		<div>
			{locationPairs?.map((location) => (

				<div className={styles.content} key={location}>
					<div className={styles.port}>{location?.origin_location?.name}</div>
					<IcMPortArrow />
					<div className={styles.port}>{location?.destination_location?.name}</div>
				</div>

			))}
		</div>
	);
}

export default LocationPairs;
