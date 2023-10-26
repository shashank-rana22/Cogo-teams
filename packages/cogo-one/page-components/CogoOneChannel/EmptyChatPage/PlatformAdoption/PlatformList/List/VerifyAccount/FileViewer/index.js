import { cl, Chips } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useEffect } from 'react';

import styles from './styles.module.css';

const getFileType = (url) => {
	if (url?.endsWith('.pdf')) {
		return 'application/pdf';
	} if (url?.endsWith('.csv')) {
		return 'text/csv';
	} if (url?.endsWith('.xlsx')) {
		return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
	}
	return '';
};

function FileViewer({
	verifyAccount = {}, documentOptions = [], selectDoc = {}, setSelectDoc = () => {},
	hasDocument = false,
}) {
	const {
		showAccountDetails = false,
	} = verifyAccount || {};

	const { docUrl = '', docType = '' } = selectDoc || {};

	const fileOptions = (documentOptions || []).map((item) => {
		const { value = '', label = '' } = item || {};

		return {
			key      : value,
			children : label,
			color    : 'green',
			tooltip  : false,
			closable : true,
		};
	});

	const fileType = getFileType(docUrl);

	useEffect(() => {
		if (!hasDocument) {
			setSelectDoc({
				docType : documentOptions?.[GLOBAL_CONSTANTS.zeroth_index]?.value,
				docUrl  : documentOptions?.[GLOBAL_CONSTANTS.zeroth_index]?.url,
			});
		}
	}, [documentOptions, hasDocument, setSelectDoc]);

	if (hasDocument && showAccountDetails) {
		return null;
	}

	return (
		<div className={cl`${!showAccountDetails ? styles.full_screen : styles.viewer}`}>
			<div className={cl`${styles.selected_sources} ${documentOptions?.length > 4 ? styles.wrap : ''}`}>
				<Chips
					items={fileOptions}
					selectedItems={docType}
					onItemChange={(val, obj) => setSelectDoc(() => ({ docType: val, docUrl: obj?.url }))}
					size="sm"
				/>
			</div>
			{!docType ? (
				<div className={styles.empty}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.empty_state_margins_url}
						width={250}
						height={showAccountDetails ? 465 : 410}
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
						type={fileType}
					/>
				</div>
			)}
		</div>
	);
}

export default FileViewer;
