import { useRouter } from '@cogoport/next';
import React from 'react';

import Header from '../../common/Header';

import styles from './styles.module.css';

function Insurance() {
	const { query } = useRouter();
	const formValues = JSON.parse(query?.data);

	return (
		<div className={styles.container}>
			<h2>Cargo Insurance</h2>
			<Header data={formValues} />
		</div>
	);
}

export default Insurance;
