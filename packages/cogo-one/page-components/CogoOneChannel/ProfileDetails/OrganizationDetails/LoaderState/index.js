import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<Placeholder height="18px" width="120px" margin="0px 0px 10px 0px" />
				<Placeholder height="18px" width="120px" margin="0px 0px 10px 0px" />
			</div>
		</div>
	);
}
export default LoadingState;
