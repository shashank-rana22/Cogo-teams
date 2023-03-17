import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const customStyle = { height: '14px' };

function Loader() {
	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<Placeholder style={{ marginRight: '50px' }} />

				<div className={styles.ports}>
					<Placeholder style={{ ...customStyle, margin: '0 0 10px 0' }} />
					<Placeholder style={customStyle} />
				</div>

				<div className={styles.ports} className="destination">
					<Placeholder style={{ ...customStyle, margin: '0 0 10px 0' }} />
					<Placeholder style={customStyle} />
				</div>
			</div>
		</div>
	);
}

export default Loader;
