import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

export default function Loader() {
	return (
		<div className={styles.container}>
			<Placeholder height="80px" />
			<Placeholder height="80px" />
			<Placeholder height="80px" />
			<Placeholder height="80px" />
		</div>
	);
}
