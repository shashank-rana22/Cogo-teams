import RequestRate from '../EmptyState/RequestRate';

import SpotBooking from './SpotBooking';
import styles from './styles.module.css';

function AdditionalTabs({ detail = {}, rates = [], loading = false, setScreen = () => {} }) {
	if (loading) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.request_rate}>
				<RequestRate
					details={detail}
					rates={rates}
				/>
			</div>

			<div className={styles.spot_booking}>
				<SpotBooking
					detail={detail}
					rates={rates}
					setScreen={setScreen}
				/>
			</div>
		</div>
	);
}

export default AdditionalTabs;
