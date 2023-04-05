import React from 'react';

import styles from './styles.module.css';

const imageData = {
	NoDataImage: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no-incident-data.svg',
	cfoDashboard:
'https://cogoport-production.sgp1.digitaloceanspaces.com/970a0d72c48e76c4da52963dfc852230/no-data.svg',
};

function EmptyState({ imageFind }) {
	return (
		<div className={styles.container}>
			<img
				className={styles.img_height}
				src={imageData[imageFind]}
				alt="No Data"
			/>
		</div>
	);
}

export default EmptyState;
