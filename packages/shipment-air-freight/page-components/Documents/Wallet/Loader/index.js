import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const WIDTH = '291px';
const HEIGHT = '90px';

function Loader() {
	return (
		<div className={styles.container}>
			<Placeholder width={WIDTH} height={HEIGHT} />
		</div>
	);
}

export default Loader;
