import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import shippingLineLinks from './shipping-line-links';
import styles from './styles.module.css';

function LinkUI({ ship = {} }) {
	let url = '';
	(shippingLineLinks || []).forEach((line) => {
		if (line?.shipping_line_name === ship?.short_name) {
			url = line?.url;
		}
	});

	return (
		<a
			className={styles.container}
			href={url}
			target="_blank"
			rel="noreferrer"
		>
			<div className={styles.detail_container}>
				<img
					src={ship?.logo_url}
					alt={ship?.short_name}
					height="35px"
					width="35px"
				/>
				<div className={styles.custom_link}>
					{ship?.short_name}
				</div>

				<div className={styles.icon_container}>
					<IcMArrowNext height="18px" width="18px" />
				</div>
			</div>
		</a>
	);
}

export default LinkUI;
