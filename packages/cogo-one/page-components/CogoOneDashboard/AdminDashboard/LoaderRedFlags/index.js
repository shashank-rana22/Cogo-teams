import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function RedFlagsLoader() {
	return (
		<>
			{
                [...Array(7)].map(() => (
	<div className={styles.loader_box}>
		<div className={styles.left_loader}>
			<Placeholder width="50px" height="35px" margin="5px 5px" border-radius="50%" />
			<Placeholder width="80px" height="35px" margin="5px 5px" />
			<Placeholder width="30px" height="35px" margin="5px 5px" />
		</div>
		<div>
			<Placeholder width="40px" height="35px" margin="5px 5px" />
		</div>

	</div>
                ))
            }
		</>
	);
}

export default RedFlagsLoader;
