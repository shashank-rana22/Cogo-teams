import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const ROWS_COUNT = 6;

function Loading() {
	return (
		<div className={styles.container}>
			{[...Array(ROWS_COUNT).keys()].map((key) => (
				<div key={key} className={styles.thumbnail}>
					<Placeholder width="100%" height="80px" margin="12px 0px" />
					<Placeholder width="100%" height="20px" />
				</div>
			))}
		</div>
	);
}

export default Loading;
