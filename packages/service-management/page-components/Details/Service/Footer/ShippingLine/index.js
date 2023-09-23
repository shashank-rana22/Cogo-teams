import { cl } from '@cogoport/components';
import Image from 'next/image';
import React from 'react';

import { SERVICES } from '../../../../../common/SERVICES';

import styles from './styles.module.css';

function ShippingLine({ mode = [], serviceType = '' }) {
	return (
		<div>
			<div className={styles.title}>
				Preffered
				{' '}
				{SERVICES?.[serviceType]?.preffered}
			</div>
			<div className={styles.flex_div}>
				{mode?.map((item) => (
					<div className={styles.flex_div} key={item}>
						{item?.[SERVICES?.[serviceType]?.logo] && (
							<Image
								className={styles.image}
								src={item?.SERVICES?.[serviceType]?.logo}
								alt={`${SERVICES?.[serviceType]?.preffered} logo`}
								width={35}
								height={35}
							/>
						)}
						<div className={cl`${styles.text} ${styles.service_name}`}>
							{item?.[SERVICES?.[serviceType]?.name] || '-'}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ShippingLine;
