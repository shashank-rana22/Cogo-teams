import { cl } from '@cogoport/components';
import React from 'react';
import { v1 as uuid } from 'uuid';

import {
	SERVICES,
	LOGO_MAPPING,
	NAME_MAPPING,
} from '../../../../../common/SERVICES';

import styles from './styles.module.css';

function ShippingLine({ mode = [], serviceType = '' }) {
	return (
		<div>
			<div className={styles.title}>
				Preffered
				{SERVICES[serviceType]}
				{' '}
				Line
			</div>
			<div className={styles.flex_div}>
				{mode?.map((item, index) => (
					<div className={styles.flex_div} key={`${`${index}${uuid()}`}`}>
						{item[LOGO_MAPPING[serviceType]] && (
							<img
								className={styles.image}
								src={item?.[LOGO_MAPPING[serviceType]]}
								alt={`${SERVICES[serviceType]} logo`}
							/>
						)}
						<div className={cl`${styles.text} ${styles.service_name}`}>
							{item?.[NAME_MAPPING[serviceType]] || '-'}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ShippingLine;
