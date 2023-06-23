import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const LOADER_COUNT = 4;

export function QuoteLoader() {
	return (
		<div>
			<Placeholder height="20px" width="400px" margin="20px 10px" />

			{[...Array(LOADER_COUNT).keys()].map((item) => (
				<div
					key={item}
					className={styles.parent_container}
				>
					<Placeholder width="20%" height="20px" margin="10px" />
					<Placeholder width="18%" height="20px" margin="10px" />
					<Placeholder width="18%" height="20px" margin="10px" />
					<Placeholder width="18%" height="20px" margin="10px" />
					<Placeholder width="20%" height="20px" margin="10px" />
				</div>
			))}

			<Placeholder height="20px" width="400px" margin="20px 10px" />

			{[...Array(LOADER_COUNT).keys()].map((item) => (
				<div
					key={item}
					className={styles.parent_container}
				>
					<Placeholder width="20%" height="20px" margin="10px" />
					<Placeholder width="18%" height="20px" margin="10px" />
					<Placeholder width="18%" height="20px" margin="10px" />
					<Placeholder width="18%" height="20px" margin="10px" />
					<Placeholder width="20%" height="20px" margin="10px" />
				</div>
			))}
		</div>
	);
}
