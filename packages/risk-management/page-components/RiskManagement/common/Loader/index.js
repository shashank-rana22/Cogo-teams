import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div>

			<div className={styles.flex_row}>
				{Array(5).fill().map((_, index) => (
					<div className={styles.percent} key={index}>
						<Placeholder className={styles.loader} />
					</div>
				))}

			</div>

		</div>
	);
}

export default Loader;
