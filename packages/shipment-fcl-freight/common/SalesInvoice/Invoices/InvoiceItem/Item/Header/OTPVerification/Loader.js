import { Placeholder } from '@cogoport/components';
import React from 'react';
import { v4 as uuid } from 'uuid';

import styles from './styles.module.css';

function Loader() {
	return (
		<div>
			{Array(2).fill().map(() => (
				<div className={styles.loader_div} key={uuid()}>
					{Array(2).fill().map((j, idx) => (
						<Placeholder width={idx === 1 ? '250px' : '200px'} margin="16px" key={uuid()} />))}
				</div>
			))}
		</div>
	);
}

export default Loader;
