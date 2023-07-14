import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<>
			{[...Array(4)].map(() => (
				<div className={styles.main_container}>
					<Placeholder height="20px" width="60%" margin="0px 0px 2px 0px" />
					<Placeholder height="22px" width="40%" margin="0px 0px 12px 0px" />
					<Placeholder height="20px" width="90%" margin="0px" />
				</div>
			))}
		</>
	);
}

export default LoadingState;
