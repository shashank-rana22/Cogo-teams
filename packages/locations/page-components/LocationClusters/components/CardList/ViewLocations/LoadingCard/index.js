import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingCard() {
	return (
		<div className={styles.container}>
			<Placeholder height="84px" width="300px" />
			<Placeholder height="84px" width="300px" />
			<Placeholder height="84px" width="300px" />
		</div>
	);
}
export default LoadingCard;
