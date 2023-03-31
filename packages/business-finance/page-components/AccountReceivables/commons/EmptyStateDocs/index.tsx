import React from 'react';

import styles from './styles.module.css';

const NoDataImage = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-doc.svg';
function EmptyStateDocs({ text = 'No Data Found' }) {
	return (
		<div className={styles.container}>
			<img
				className={styles.img_height}
				src={NoDataImage}
				alt="No Data"
				height="240px"
				width="180px"
			/>
			<div>{text}</div>
		</div>
	);
}
export default EmptyStateDocs;
