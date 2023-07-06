import { IcMAirport } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Airlines(props) {
	const { data, option } = props;

	const { business_name = '', logo_url = '', iata_code = '' } = data || option || {};

	return (
		<div className={styles.container}>
			<span className={styles.sub_container}>
				{logo_url ? (
					<img
						alt="logo"
						src={logo_url}
						style={{ maxWidth: '16px', marginRight: '20px' }}
					/>
				) : (
					<IcMAirport
						width={16}
						height={16}
						fill="#888888"
						style={{ marginRight: '20px' }}
					/>
				)}

				<span>{business_name || ''}</span>
			</span>
			<span>{iata_code}</span>
		</div>
	);
}

export default Airlines;
