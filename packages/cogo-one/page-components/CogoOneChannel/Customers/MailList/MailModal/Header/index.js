import { cl, Button } from '@cogoport/components';
import { IcMSend, IcMAttach } from '@cogoport/icons-react';

import CustomFileUploader from '../../../../../../common/CustomFileUploader';

import styles from './styles.module.css';

function RenderHeader({
	createLoading = false,
	replyLoading = false,
	handleSend = () => {},
	uploading,
	setUploading = () => {},
	setAttachments = () => {},
	handleClose = () => {},
	uploaderRef,
}) {
	const handleProgress = (val) => {
		setUploading(val);
	};
	return (
		<>
			<div className={cl`${(createLoading || replyLoading) ? styles.disabled_button : styles.send_icon}`}>
				<IcMSend
					onClick={handleSend}
				/>
			</div>
			<div className={styles.title}>New Message</div>
			<div className={styles.right_header}>
				<div className={styles.file_uploader_div}>
					<CustomFileUploader
						disabled={uploading}
						handleProgress={handleProgress}
						className="file_uploader"
						accept=".png, .pdf, .jpg, .jpeg, .doc, .docx, .csv, .svg, .gif, .mp4, .xlsx"
						multiple
						uploadIcon={(
							<IcMAttach
								className={styles.upload_icon}
								fill="#000000"
								style={{
									cursor: uploading
										? 'not-allowed'
										: 'pointer',
								}}
							/>
						)}
						onChange={(val) => {
							setAttachments(val);
						}}
						showProgress={false}
						ref={uploaderRef}
					/>
				</div>
				<Button size="md" themeType="link" onClick={handleClose}>Cancel</Button>
			</div>
		</>
	);
}
export default RenderHeader;
