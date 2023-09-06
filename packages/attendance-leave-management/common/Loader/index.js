import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_COUNT = 5;

function Loader() {
	return (
		<div className={styles.loader}>
			{[...Array(DEFAULT_COUNT).keys()].map((val) => (
				<Placeholder key={val} height="60px" width="100%" margin="0px 0px 20px 0px" />
			))}
		</div>
	);
}

export default Loader;
