import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			<div className={styles.flex_col}>
				<Placeholder height="80px" width="33%" margin-bottom="6px" />
				<Placeholder height="80px" width="33%" margin-bottom="6px" />
				<Placeholder height="80px" width="33%" margin-bottom="6px" />
			</div>

			<div className={styles.flex_col}>
				<Placeholder height="80px" width="33%" margin-bottom="6px" />
				<Placeholder height="80px" width="33%" margin-bottom="6px" />
				<Placeholder height="80px" width="33%" margin-bottom="6px" />
			</div>

			<div className={styles.flex_col}>
				<Placeholder height="80px" width="33%" margin-bottom="6px" />
				<Placeholder height="80px" width="33%" margin-bottom="6px" />
				<Placeholder height="80px" width="33%" margin-bottom="6px" />
			</div>
		</div>
	);
}

export default Loader;
