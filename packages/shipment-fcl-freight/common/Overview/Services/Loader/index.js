import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			<div className={styles.flex_col}>
				<Placeholder height="80px" width="100%" margin="0px 0px 0px 0px" />
				<Placeholder height="80px" width="100%" margin="0px 0px 0px 0px" />
				<Placeholder height="80px" width="100%" margin="0px 0px 0px 0px" />
			</div>

			<div className={styles.flex_col}>
				<Placeholder height="80px" width="100%" margin="0px 0px 0px 0px" />
				<Placeholder height="80px" width="100%" margin="0px 0px 0px 0px" />
				<Placeholder height="80px" width="100%" margin="0px 0px 0px 0px" />
			</div>

			<div className={styles.flex_col}>
				<Placeholder height="80px" width="100%" margin="0px 0px 0px 0px" />
				<Placeholder height="80px" width="100%" margin="0px 0px 0px 0px" />
				<Placeholder height="80px" width="100%" margin="0px 0px 0px 0px" />
			</div>
		</div>
	);
}

export default Loader;
