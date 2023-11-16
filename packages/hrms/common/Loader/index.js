import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader({ height, count = 5 }) {
	return (
		<div className={styles.loader}>
			{[...Array(count).keys()].map((val) => (
				<Placeholder key={val} height={height} width="100%" margin="0px 0px 20px 0px" />
			))}
		</div>
	);
}

export default Loader;
