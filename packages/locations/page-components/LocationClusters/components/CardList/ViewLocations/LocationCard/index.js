import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function LocationCard({ name = '', type = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.name}>{startCase(name)}</div>
			<div className={styles.pill_container}>
				<Pill
					size="lg"
					style={{ width: 'fit-content' }}
					className={styles[type.includes('port') ? type : 'land']}
				>
					{startCase(type)}
				</Pill>
			</div>
		</div>
	);
}
export default LocationCard;
