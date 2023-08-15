import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const PLACEHOLDERS_COUNT = 5;

function Loader() {
	return (
		<div className={styles.container}>
			{[...Array(PLACEHOLDERS_COUNT).keys()]
				.map((key) => (
					<Placeholder
						className={styles.custom_styles}
						key={key}
					/>
				))}
		</div>
	);
}

export default Loader;
