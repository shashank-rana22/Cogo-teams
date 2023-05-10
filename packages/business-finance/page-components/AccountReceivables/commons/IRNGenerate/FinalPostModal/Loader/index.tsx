import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<>
			{
		[1, 2].map(() => (

			<div className={styles.style_placeholder}>
				<Placeholder height="40px" />
			</div>

		))
	}
		</>
	);
}
export default Loader;
