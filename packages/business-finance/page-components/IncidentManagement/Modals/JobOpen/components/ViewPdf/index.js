import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import Image from 'next/image';

import styles from './styles.module.css';

const FIRST = 1;

function ViewPdf({ row = {} }) {
	const docUrl = row?.data?.jobOpenRequest?.documentUrls?.[GLOBAL_CONSTANTS.zeroth_index] || '';
	const decodedUrl = decodeURI(docUrl);
	const urlSplitByDot = decodedUrl?.split?.('.') || [];
	const extension = urlSplitByDot?.[urlSplitByDot.length - FIRST] || '';
	if (extension === 'zip') {
		return (
			<div className={styles.zip_text}>
				The zip file has been downloaded.
				<div>
					<Image
						src={GLOBAL_CONSTANTS.image_url.ic_initial_state_svg}
						width={500}
						height={500}
						alt="Empty-state"
					/>
				</div>
			</div>

		);
	}
	return (
		isEmpty(docUrl) ? (
			<Image
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
