import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const WIDTH = '291px';
const HEIGHT = '90px';

function Loader() {
	return (
		<div className={styles.container}>
			<div className={styles.comments_wrap}>
				<Placeholder width={WIDTH} height={HEIGHT} />

				<Placeholder width={WIDTH} height={HEIGHT} />

			</div>
		</div>
	);
}

export default Loader;
