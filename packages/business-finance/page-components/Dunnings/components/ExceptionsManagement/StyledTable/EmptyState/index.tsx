import React from 'react';

import styles from './styles.module.css';

interface ItemProps {
	imageFind:string,
	imgHeight?:string,
}

const imageData = {
	NoDataImage      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no-incident-data.svg',
	FinanceDashboard : 'https://cogoport-production.sgp1.digitaloceanspaces.com/'
	+ '970a0d72c48e76c4da52963dfc852230/no-data.svg',
	NoInoiceFound: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no_invoice_found.png',
};

function EmptyState({ imageFind, imgHeight }:ItemProps) {
	return (
		<div className={styles.container}>
			<img
				className={imgHeight === 'imageHeight' ? styles.image_height : styles.img_height}
				src={imageData[imageFind]}
				alt="No Data"
			/>
		</div>
	);
}

export default EmptyState;
