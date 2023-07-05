import { Placeholder } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Loading() {
	return (
		<div className={styles.container}>
			<div className={styles.location}>
				<Placeholder height="25px" width="200px" margin="0px 0px 8px 0px" />
				<Placeholder height="25px" width="150px" />
			</div>

			<div className={styles.icon}>
				<IcMArrowNext style={{ width: '1.5em', height: '1.5em' }} />
			</div>
			<div className={styles.location}>
				<Placeholder height="25px" width="200px" margin="0px 0px 8px 0px" />
				<Placeholder height="25px" width="150px" />
			</div>

		</div>
	);
}

export default Loading;
