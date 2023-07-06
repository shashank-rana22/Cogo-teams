import { Checkbox, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMSend,
	IcMAttach,
	IcMCross,
	IcMImage,
	IcMPdf,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useRef } from 'react';

import CustomFileUploader from '../../../CustomFileUploader';

import styles from './styles.module.css';

const URL_ARRAY_LAST_ELEMENT = 1;

function FooterChat({
	setMessage = () => {},
	message = '',
	handleKeyPress = () => {},
	file,
	setFile = () => {},
	uploading = false,
	isInternal,
	setUploading = () => {},
	setIsInternal = () => {},
	handleSendComment = () => {},
}) {
	let fileName = '';
	const chatRef = useRef(null);

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
						<div className={styles.file_details}>Uploading....</div>
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
			<Checkbox
				label="Send to internal user only"
				checked={isInternal}
				onChange={() => setIsInternal((prev) => !prev)}
			/>
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
					placeholder="Type here ..."
					onChange={(val) => setMessage(val)}
					onKeyDown={(e) => handleKeyPress(e)}
					value={message}
				/>
				<IcMSend
					className={styles.send_icon}
					onClick={handleSendComment}
					cursor="pointer"
					fill="#EE3425"
				/>
			</div>
		</>
	);
}

export default FooterChat;
