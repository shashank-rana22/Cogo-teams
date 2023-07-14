import { Placeholder } from '@cogoport/components';
import React from 'react';

import useHeaderStats from '../../hooks/useHeaderStats';
import getResponseHeaderValues from '../../utils/get-response-header-values';

import styles from './styles.module.css';

const KEYS_TO_DISPLAY = [
	'serial_id',
	'business_name',
	'request_id',
	'request_type',
	'created_on',
];

function Header() {
	const { data = {}, loading } = useHeaderStats();

	const values = getResponseHeaderValues({ data });

	if (loading) {
		return <Placeholder className={styles.loading} height="80px" width="100%" />;
	}

	return (
		<div className={styles.main_container}>
			<div className={styles.content}>
				{(KEYS_TO_DISPLAY || []).map((item) => (
					<div key={item} className={styles.item}>
						<div className={styles.label}>
							{values[item].label}
						</div>

						<div className={styles.value}>
							{values[item].value}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Header;
