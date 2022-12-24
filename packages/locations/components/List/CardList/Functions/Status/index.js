import startCase from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Status({ value }) {
	return <div className={styles.conotainer}>{startCase(value)}</div>;
}

export default Status;
