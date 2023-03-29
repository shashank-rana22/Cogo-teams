import React from 'react';

import styles from './styles.module.css';

const imageData = {
	NoDataImage: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no-incident-data.svg',
	cfoDashboard:
'https://cogoport-testing.sgp1.digitaloceanspaces.com/5b0256497b211484546e7a26f76016af/No%20data-cuate.svg',
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
