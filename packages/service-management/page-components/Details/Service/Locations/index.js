import { isEmpty } from '@cogoport/utils';
import { v1 as uuid } from 'uuid';

import styles from './styles.module.css';

function Locations({ locations = [], service = '' }) {
	if (isEmpty(locations)) {
		return <div className={styles.empty_state}>No Locations Addeed</div>;
	}

	const TeusCheck = ['air_freight', 'air_customs', 'air-local-agents'].includes(
		service,
	);

	return (locations || [])?.map((location, index) => (
		<div className={styles.content} key={`${`${index}${uuid()}`}`}>
			<div className={styles.port}>{location.location?.name}</div>
			<div className={styles.trade_type}>{location.trade_type}</div>
			<div className={styles.teus}>
				{location.total_teus}
				{' '}
				{TeusCheck ? 'Kgs' : 'Teus'}
			</div>
		</div>
	));
}

export default Locations;
