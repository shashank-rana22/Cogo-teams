import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const ARRAY_LENGTH = 4;

function Loader() {
	return (
		<div>
			{[...Array(ARRAY_LENGTH).keys()].map((item) => (
				<Placeholder height="46px" key={item} className={styles.margin} />))}
		</div>
	);
}

export default Loader;
