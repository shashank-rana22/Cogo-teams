import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const LOADING_ARRAY_LENGTH = 3;

function Loading() {
	return (
		<div className={styles.container}>
			<div className={styles.stats_container}>
				{[...Array(LOADING_ARRAY_LENGTH).keys()].map((key) => (
					<Placeholder
						key={key}
						height="32px"
						width="120px"
						margin="8px 36px 0px 0px"
					/>
				))}
			</div>
		</div>
	);
}

export default Loading;
