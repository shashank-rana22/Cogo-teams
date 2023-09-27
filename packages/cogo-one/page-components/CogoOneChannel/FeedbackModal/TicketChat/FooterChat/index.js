import { Checkbox, Textarea, Tooltip, Loader, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMInfo,
	IcMSend,
	IcMAttach,
	IcMCross,
	IcMImage,
	IcMPdf,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef } from 'react';

import CustomFileUploader from '../../../../../common/CustomFileUploader';

import styles from './styles.module.css';

const URL_ARRAY_LAST_ELEMENT = 1;

function FooterChat({
	setMessage = () => {},
	message = '',
	handleKeyPress = () => {},
	file = '',
	setFile = () => {},
	uploading = false,
	isInternal = true,
	createLoading = false,
	notifyCustomer = false,
	setUploading = () => {},
	setIsInternal = () => {},
	handleSendComment = () => {},
}) {
	let fileName = '';
	const chatRef = useRef(null);
	const { t } = useTranslation(['myTickets']);

	const isMessageEmpty = isEmpty(message);

	const handleProgress = (obj) => {
		if (obj) {
			setUploading(true);
		}
	};

	const handleChange = (obj) => {
		if (obj) {
			setFile(obj);
			setUploading(false);
		}
	};

	if (file) {
		const urlArray = decodeURI(file)?.split('/');
		fileName = urlArray[(urlArray?.length || GLOBAL_CONSTANTS.zeroth_index) - URL_ARRAY_LAST_ELEMENT] || '';
	}

	useEffect(() => {
		chatRef?.current?.focus();
	}, []);

	return (
		<>
			{(!isEmpty(file) || uploading) && (
				<div className={styles.file_div}>
					{uploading ? (
						<div className={styles.file_details}>{t('myTickets:uploading')}</div>
					) : (
						<div className={styles.file_details}>
							<div className={styles.file_icon_holder}>
								{fileName.match(GLOBAL_CONSTANTS.regex_patterns.image_extension) ? (
									<IcMImage className={styles.image_preview} />
								) : (
									<IcMPdf className={styles.pdf_icon} />
								)}
							</div>
							<div className={styles.file_text}>{fileName}</div>
							<IcMCross
								className={styles.delete_icon}
								onClick={() => setFile('')}
							/>
						</div>
					)}
				</div>
			)}
			<div className={styles.is_internal}>
				<Checkbox
					label={t('myTickets:internal_activity')}
					checked={isInternal}
					disabled={!notifyCustomer}
					onChange={() => setIsInternal((prev) => !prev)}
				/>
				<Tooltip
					content={t('myTickets:internal_activity_tooltip_content')}
					placement="top"
				>
					<IcMInfo className={styles.is_internal_info} />
				</Tooltip>
			</div>
			<div className={styles.bot_footer}>
				<CustomFileUploader
					handleProgress={handleProgress}
					showProgress={false}
					draggable
					className="file_uploader"
					uploadIcon={(
						<IcMAttach
							className={styles.upload_icon}
							style={{ cursor: 'pointer' }}
						/>
					)}
					onChange={handleChange}
				/>
				<Textarea
					ref={chatRef}
					className={styles.chat_input}
					placeholder={t('myTickets:chat_input_type_here')}
					onChange={(val) => setMessage(val)}
					onKeyDown={(e) => handleKeyPress(e)}
					value={message}
				/>
				<div className={styles.loader}>
					{createLoading ? (<Loader themeType="primary" />)
						: (
							<IcMSend
								className={cl`${styles.send_icon} ${isMessageEmpty ? styles.disabled_icon : ''}`}
								onClick={handleSendComment}
								cursor="pointer"
							/>
						)}
				</div>
			</div>
		</>
	);
}

export default FooterChat;
