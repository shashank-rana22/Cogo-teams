import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

export default function Loader() {
	return (
		<>
			<div className={styles.loadercontainer}>
				<Placeholder height="64px" />
			</div>
			<div className={styles.loadercontainer}>
				<Placeholder height="64px" />
			</div>
			<div className={styles.loadercontainer}>
				<Placeholder height="64px" />
			</div>
		</>

	);
}
