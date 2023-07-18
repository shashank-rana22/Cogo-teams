import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const PLACEHOLDER = [1, 2, 3, 4, 5];

function Loader() {
	return (
		<div className={styles.container}>
			{ PLACEHOLDER.map((key) => <Placeholder className={styles.custom_styles} key={key} />) }
		</div>
	);
}

export default Loader;
