import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingFooter() {
	return (
		<div className={styles.container}>
			<Placeholder height="20px" width="150px" />
			<Placeholder height="20px" width="150px" />
			<Placeholder height="20px" width="150px" />
			<Placeholder height="20px" width="150px" />
		</div>
	);
}

export default LoadingFooter;
