import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function ViewPdf({ row = {} }) {
	const docUrl = row?.data?.jobOpenRequest?.documentUrls?.[GLOBAL_CONSTANTS.zeroth_index];
	return (

		<iframe
			src={docUrl}
			title="PDF"
			className={styles.pdf_container}
		/>

	);
}

export default ViewPdf;
