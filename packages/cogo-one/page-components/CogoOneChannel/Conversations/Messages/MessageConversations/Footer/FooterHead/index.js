import { Input, cl, Button } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useState } from 'react';

import MailRecipientType from '../../../../../../../common/MailRecipientType';
import MAIL_RECIEPIENTS_MAPPING from '../../../../../../../helpers/getMailReciepientMapping';
import mailFunction from '../../../../../../../utils/mailFunctions';

import styles from './styles.module.css';
import UploadedFiles from './UploadedFiles';

const HEADER_TEXT_MAPPING = {
	forward   : 'Forwarding',
	reply     : 'Replying to',
	reply_all : 'Replying All',
};

function FooterHead({
	isEmail = false,
	mailActions = {},
	setErrorValue = () => {},
	emailState = {},
	setShowControl = () => {},
	showControl = '',
	setEmailState = () => {},
	errorValue = '',
	uploading = {},
	roomId = '',
	fileMetaData = [],
	setDraftUploadedFiles = () => {},
	hasUploadedFiles = false,
	uploaderRef = {},
	setMailActions = () => {},
}) {
	const { actionType = '', data = {} } = mailActions || {};

	const [openReceipients, setOpenReceipents] = useState(actionType === 'reply_all');

	const emailReceipientProps = mailFunction({
		setErrorValue,
		emailState,
		setShowControl,
		showControl,
		setEmailState,
	});

	const { response } = data || {};
	const { subject } = response || {};

	return (
		<>
			{isEmail && (
				<>
					<div className={styles.header_email}>
						<div className={styles.reply_header_text}>
							{HEADER_TEXT_MAPPING[actionType] || ''}
							:
							<span>{subject}</span>
						</div>
						<IcMCross
							className={styles.cross_icon}
							onClick={() => {
								setMailActions({ actionType: '', data: {} });
							}}
						/>
					</div>
					<div className={styles.child_flex}>
						<div className={styles.subject}>
							<div className={styles.label}>
								To:
							</div>
							<MailRecipientType
								{...(emailReceipientProps || {})}
								emailRecipientType={emailState?.toUserEmail}
								type="toUserEmail"
								errorValue={errorValue}
								showControl={showControl}
								key={mailActions?.type}
							/>
						</div>
						<Button
							size="md"
							themeType="linkUi"
							onClick={() => setOpenReceipents((prev) => !prev)}
						>
							{openReceipients ? 'hide' : 'cc'}
						</Button>
					</div>
					<div className={styles.parent_reciepients} key={mailActions?.type}>
						<div
							className={styles.reciepents}
							style={{
								height: openReceipients
									? 'fit-content' : '0',
							}}
						>
							{MAIL_RECIEPIENTS_MAPPING.map((eachItem) => {
								const { label = '', value = '' } = eachItem || {};

								return (
									<div key={value} className={styles.child_flex}>
										<div className={styles.label}>
											{label}
											:
										</div>
										<MailRecipientType
											{...(emailReceipientProps || {})}
											emailRecipientType={emailState?.[eachItem.value]}
											type={eachItem.value}
											errorValue={errorValue}
											showControl={showControl}
											key={mailActions?.type}
										/>
									</div>
								);
							})}
						</div>
						<div className={styles.child_flex}>
							<div className={styles.label}>
								Sub:
							</div>
							<Input
								value={emailState?.subject}
								onChange={(val) => setEmailState((prev) => ({ ...prev, subject: val }))}
								size="xs"
								className={styles.styled_input}
							/>
						</div>
					</div>
				</>
			)}
			<div
				className={cl`${styles.nofile_container}
				${((hasUploadedFiles) || uploading?.[roomId]) ? styles.upload_file_container : ''}`}
			>
				{(hasUploadedFiles) && !uploading?.[roomId] && (
					fileMetaData?.map(
						(eachFileData) => (
							<UploadedFiles
								roomId={roomId}
								key={eachFileData?.fileUrl}
								setDraftUploadedFiles={setDraftUploadedFiles}
								uploaderRef={uploaderRef}
								eachFileData={eachFileData}
							/>
						),
					)
				)}
				{uploading?.[roomId] && (
					<div className={styles.uploading}>
						uploading.....
					</div>
				)}
			</div>
		</>
	);
}

export default FooterHead;
