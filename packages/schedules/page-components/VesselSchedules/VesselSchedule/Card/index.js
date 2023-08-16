import Upper from '../../VesselSchedulesList/VesselScheduleCard/Upper';

import Lower from './Lower';
import styles from './styles.module.css';

function Card({ vessel, loading }) {
	return (
		<div role="presentation" className={styles.card}>
			<div className={styles.upper}>
				<Upper vessel={vessel} loading={loading} />
			</div>
			<Lower vessel={vessel} loading={loading} />
		</div>
	);
}
export default Card;
