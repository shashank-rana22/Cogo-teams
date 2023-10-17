import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div>
			{[...Array(4)].map((item) => (<Placeholder height="46px" key={item} className={styles.margin} />))}
		</div>
	);
}

export default Loader;