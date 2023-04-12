import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			{[...Array(8)].map(() => (
				<div className={styles.loader_wrapper}>
					<Placeholder width="60px" height="25px" />
					<Placeholder width="250px" height="25px" />
					<Placeholder width="60px" height="25px" />
				</div>
			))}
		</div>
	);
}

export default Loader;
