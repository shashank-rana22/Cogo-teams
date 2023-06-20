import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			{[1, 2, 3, 4, 5].map((key) => <Placeholder className={styles.custom_styles} key={key} />)}
		</div>
	);
}

export default Loader;
