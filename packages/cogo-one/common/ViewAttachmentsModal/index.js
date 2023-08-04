import { Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { ImageBody, VideoBody, AudioBody, ObjectBody } from './renderModalBody';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	image : ImageBody,
	audio : AudioBody,
	video : VideoBody,
};

const renderContent = (showPreview) => `data:${showPreview?.contentType};base64,${showPreview?.contentBytes}`;

function RenderTitle({ item = '', handleDownload = () => {} }) {
	return (
		<div className={styles.title}>
			<div>{decodeURI(item?.name)}</div>

			<IcMDownload
				onClick={() => handleDownload(item)}
				className={styles.download_icon}
			/>
		</div>
	);
}

function ViewAttachmentsModal({
	handleDownload = () => {},
	activeAttachmentData = {},
	setActiveAttachmentData = () => {},
	urlType = '',
}) {
	let activeAttachmentContent;
	let activeAttachmentType;

	if (urlType === 'urlBased') {
		activeAttachmentContent = activeAttachmentData?.fileUrl;
		activeAttachmentType = activeAttachmentData?.fileExtension;
	} else {
		activeAttachmentContent = activeAttachmentData?.contentType;
		activeAttachmentType = activeAttachmentContent.split('/')?.[GLOBAL_CONSTANTS.zeroth_index];
	}

	const ActiveCompoonent = COMPONENT_MAPPING[activeAttachmentType] || ObjectBody;

	return (
		<Modal
			show={!isEmpty(activeAttachmentData)}
			onClose={() => setActiveAttachmentData(null)}
			size="xl"
			placement="center"
			onOuterClick={() => setActiveAttachmentData(null)}
			className={styles.styled_ui_modal_dialog}
		>
			<Modal.Header
				title={(
					<RenderTitle
						item={activeAttachmentData}
						handleDownload={handleDownload}
					/>
				)}
			/>
			<Modal.Body>
				<ActiveCompoonent
					key={activeAttachmentType}
					media_url={urlType === 'urlBased' ? activeAttachmentContent : renderContent(activeAttachmentData)}
					contentType={activeAttachmentContent}
				/>
			</Modal.Body>
		</Modal>
	);
}

export default ViewAttachmentsModal;
