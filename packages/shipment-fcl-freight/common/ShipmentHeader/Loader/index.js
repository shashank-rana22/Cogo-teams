import { Placeholder, cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const customStyle = { height: '14px' };

function Loader() {
	return (
		<div className={styles.container}>

			<div className={styles.details}>
				<Placeholder style={{ marginRight: '50px' }} />

				<Placeholder className="circle" width="45px" height="45px" />

				<div className={styles.ports}>
					<Placeholder style={{ ...customStyle, margin: '0 0 10px 0' }} />
					<Placeholder style={customStyle} />
				</div>

				<div className={cl` ${styles.ports} ${styles.destination}`}>
					<Placeholder style={{ ...customStyle, margin: '0 0 10px 0' }} />
					<Placeholder style={customStyle} />
				</div>

				<Placeholder style={{ marginRight: '16px' }} />
				<Placeholder style={{ marginRight: '16px' }} />
				<Placeholder style={{ marginRight: '16px' }} />
				<Placeholder style={{ marginRight: '16px' }} />
			</div>

		</div>
	);
}

export default Loader;
