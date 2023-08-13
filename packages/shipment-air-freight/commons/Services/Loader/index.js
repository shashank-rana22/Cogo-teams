import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			<div className={styles.flex_col}>
				<Placeholder height="60px" />
				<Placeholder height="60px" />
				<Placeholder height="60px" />
			</div>

			<div className={styles.flex_col}>
				<Placeholder height="60px" />
				<Placeholder height="60px" />
				<Placeholder height="60px" />
			</div>

			<div className={styles.flex_col}>
				<Placeholder height="60px" />
				<Placeholder height="60px" />
				<Placeholder height="60px" />
			</div>
		</div>
	);
}

export default Loader;
