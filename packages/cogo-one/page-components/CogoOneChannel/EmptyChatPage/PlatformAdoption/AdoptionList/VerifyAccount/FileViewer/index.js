import { cl, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function FileViewer({ verifyAccount = {}, documentOptions = [], selectDoc = {}, setSelectDoc = () => {} }) {
	const {
		showAccountDetails = false,
	} = verifyAccount || {};

	const { docUrl = '', docType = '' } = selectDoc || {};

	if (isEmpty(documentOptions) && showAccountDetails) {
		return null;
	}

	return (
		<div className={cl`${!showAccountDetails ? styles.full_screen : styles.viewer}`}>
			<Select
				value={docType}
				onChange={(val, obj) => setSelectDoc(() => ({ docType: val, docUrl: obj?.url }))}
				options={documentOptions}
				size="sm"
				placeholder="Select document type"
			/>
			{!docType ? (
				<div className={styles.empty}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.empty_state_margins_url}
						width={150}
						height={150}
						alt="empty"
					/>
				</div>
			) : (
				<div className={styles.content}>
					<iframe
						loading="lazy"
						src={docUrl}
						width={showAccountDetails ? 734 : 765}
						height={showAccountDetails ? 460 : 408}
						title="PDF document"
					/>
				</div>
			)}
		</div>
	);
}

export default FileViewer;
