import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const CustomStyles = { width: '200px', height: '40px', borderRadius: '2px' };

function Loader() {
	return (
		<div className={styles.container}>
			<Placeholder style={CustomStyles} />
			<Placeholder style={CustomStyles} />
			<Placeholder style={CustomStyles} />
			<Placeholder style={CustomStyles} />
		</div>
	);
}

export default Loader;
