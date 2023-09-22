import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ViewPdf({ row = {} }) {
	const docUrl = row?.data?.jobOpenRequest?.documentUrls?.[GLOBAL_CONSTANTS.zeroth_index] || '';
	return (
		isEmpty(docUrl) ? (
			<img
				src={GLOBAL_CONSTANTS.image_url.list_no_result_found}
				width={600}
				height={500}
				alt="Empty-state"
				className={styles.empty_state}
			/>
		)
			: (

				<iframe
					src={docUrl}
					title="PDF"
					className={styles.pdf_container}
				/>

			)

	);
}

export default ViewPdf;
