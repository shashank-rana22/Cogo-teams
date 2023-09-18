import DotLoader from '../DotLoader';

import styles from './styles.module.css';

function CardLoadingState() {
	return (
		<div className={styles.spinner_container}>
			<DotLoader />

			<div className={styles.loading_text}>Kindly wait, fetching relevant information...</div>
		</div>
	);
}

export default CardLoadingState;
