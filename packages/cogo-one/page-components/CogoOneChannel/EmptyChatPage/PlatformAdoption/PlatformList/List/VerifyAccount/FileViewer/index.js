import { cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFcrossInCircle, IcCFtick, IcMHourglass, IcMTick } from '@cogoport/icons-react';
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

const DOC_STATUS_MAPPING = {
	verified : <IcCFtick width={12} height={12} className={styles.stauts_icon} />,
	pending  : <IcMHourglass width={12} height={12} fill="#fbd1a6" className={styles.stauts_icon} />,
	rejected : <IcCFcrossInCircle width={12} height={12} className={styles.stauts_icon} />,
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
		const { value = '', label = '', url = '', id = '', status = '' } = item || {};

		return {
			key      : value,
			children : label,
			color    : 'green',
			tooltip  : false,
			closable : true,
			url,
			id,
			status,
		};
	});

	const fileType = getFileType(docUrl);

	useEffect(() => {
		if (!hasDocument) {
			setSelectDoc({
				docType : documentOptions?.[GLOBAL_CONSTANTS.zeroth_index]?.value,
				docUrl  : documentOptions?.[GLOBAL_CONSTANTS.zeroth_index]?.url,
				docId   : documentOptions?.[GLOBAL_CONSTANTS.zeroth_index]?.id,
			});
		}
	}, [documentOptions, hasDocument, setSelectDoc]);

	if (hasDocument && showAccountDetails) {
		return null;
	}

	return (
		<div className={cl`${!showAccountDetails ? styles.full_screen : styles.viewer}`}>
			<div className={cl`${styles.selected_sources} ${documentOptions?.length > 4 ? styles.wrap : ''}`}>
				<div className={styles.chips_container}>
					{fileOptions.map((itm) => {
						const { key = '', url = '', children = '', id = '', status = '' } = itm || {};

						return (
							<button
								type="button"
								key={key}
								className={cl`${styles.ui_chip_container} 
                        		${docType === key ? styles.active_chip : ''}`}
								onClick={() => {
									setSelectDoc(() => ({ docType: key, docUrl: url, docId: id }));
								}}
							>
								{docType === key ? (
									<div className={styles.select}>
										<IcMTick />
									</div>
								) : null}
								<div className={styles.all_children}>
									<Tooltip content={children} placement="bottom">
										<div className={styles.children}>
											{children}
											{DOC_STATUS_MAPPING?.[status]}
										</div>
									</Tooltip>
								</div>
							</button>
						);
					})}
				</div>
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
