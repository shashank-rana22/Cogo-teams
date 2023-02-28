import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div direction="column">
			{Array(5)
				.fill('')
				.map(() => (
					<div className={styles.loading_container}>
						<Placeholder height="24px" width="15%" />
						<Placeholder height="24px" width="15%" />
						<Placeholder height="24px" width="15%" />
						<Placeholder height="24px" width="15%" />
						<Placeholder height="24px" width="15%" />

					</div>
				))}
		</div>
	);
}

export default LoadingState;
