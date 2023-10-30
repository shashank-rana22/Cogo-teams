import { IcMOpenlink } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const INCREMENT_NUM = 1;

function FormatCertificate({ certificates = [] }) {
	return (
		<div className={styles.certificate_container}>
			{(certificates || []).map((item, key) => (
				<a href={item} target="_blank" rel="noreferrer" key={item}>
					Click to view certificate
					{' '}
					{key + INCREMENT_NUM}
					{' '}
					<IcMOpenlink />
					<br />
				</a>
			))}
		</div>
	);
}

export default FormatCertificate;
