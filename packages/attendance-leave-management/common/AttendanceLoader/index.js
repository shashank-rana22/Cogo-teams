import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.loader}>
			<Placeholder height="60px" width="100%" margin="0px 0px 20px 0px" />
			<Placeholder height="60px" width="100%" margin="0px 0px 20px 0px" />
			<Placeholder height="60px" width="100%" margin="0px 0px 20px 0px" />
			<Placeholder height="60px" width="100%" margin="0px 0px 20px 0px" />
			<Placeholder height="60px" width="100%" margin="0px 0px 20px 0px" />
		</div>

	);
}

export default Loader;
