import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const ARRAY_LENGTH = 5;
function Loader() {
	return (
		<div>

			<div className={styles.flex_row}>
				{Array(ARRAY_LENGTH).fill().map((item) => (
					<div className={styles.percent} key={item}>
						<Placeholder className={styles.loader} />
					</div>
				))}

			</div>

		</div>
	);
}

export default Loader;
