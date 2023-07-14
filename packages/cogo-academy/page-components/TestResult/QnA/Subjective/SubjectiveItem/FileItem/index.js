import { IcMDocument } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function FileItem({ name = '' }) {
	return (
		<div className={styles.container}>
			<IcMDocument width={16} height={16} />
			<span className={styles.text}>{name}</span>
		</div>
	);
}

export default FileItem;
