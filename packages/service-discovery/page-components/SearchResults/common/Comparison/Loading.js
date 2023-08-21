import DotLoader from '../../../../common/DotLoader';

import styles from './styles.module.css';

function Loading() {
	return (
		<div className={styles.loading_container}>
			<span className={styles.loading_text}>Loading Comparison</span>
			<DotLoader />
		</div>
	);
}

export default Loading;
