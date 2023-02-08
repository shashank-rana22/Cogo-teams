import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.container}>
			<Placeholder height="70px" width="20%" margin="16px 0" />
			<Placeholder height="70px" width="20%" margin="16px 0" />
			<Placeholder height="70px" width="20%" margin="16px 0" />
			<Placeholder height="70px" width="98%" margin="16px 0" />
		</div>
	);
}

export default LoadingState;
