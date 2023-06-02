import { Textarea } from '@cogoport/components';
import {
	IcMSend,
	IcMAttach,
	IcMCross,
	IcMImage,
	IcMPdf,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useRef } from 'react';

import { MATCH_IMAGE_EXTENSION } from '../../../../constants';
import CustomFileUploader from '../../../CustomFileUploader';

import styles from './styles.module.css';

function FooterChat({
	setMessage = () => {},
	message = '',
	handleKeyPress = () => {},
	file,
	setFile = () => {},
	uploading = false,
	setUploading = () => {},
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
		fileName = urlArray[(urlArray?.length || 0) - 1] || '';
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
								{fileName.match(MATCH_IMAGE_EXTENSION) ? (
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
