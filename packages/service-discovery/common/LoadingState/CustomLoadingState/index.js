import DotLoader from '../DotLoader';

import styles from './styles.module.css';

function CustomLoadingState() {
	return (
		<div className={styles.loader}>
			<DotLoader dotsLegth={6} size="lg" />
		</div>
	);
}

export default CustomLoadingState;
