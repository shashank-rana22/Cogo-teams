import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div direction="column">
			{[1, 2, 3, 4, 5].map((item) => (
				<div key={item} className={styles.loading_container}>
					{[6, 7, 8, 9, 10].map((key) => (<Placeholder key={key} height="24px" width="15%" />))}
				</div>
			))}
		</div>
	);
}

export default LoadingState;
