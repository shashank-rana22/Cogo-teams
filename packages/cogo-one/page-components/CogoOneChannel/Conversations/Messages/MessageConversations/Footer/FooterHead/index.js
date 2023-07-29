import { Input, cl, Button } from '@cogoport/components';
import { useState } from 'react';

import MailRecipientType from '../../../../../../../common/MailRecipientType';
import getMailReciepientMapping from '../../../../../../../helpers/getMailReciepientMapping';
import mailFunction from '../../../../../../../utils/mailFunctions';

import styles from './styles.module.css';
import UploadedFiles from './UploadedFiles';

const DEFAULT_VISIBLE_RECIEPIENTS = 1;

const DEFAULT_HEIGHT = 34;

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
	id = '',
	fileMetaData = [],
	setDraftUploadedFiles = () => {},
	hasUploadedFiles = false,
	uploaderRef = {},
}) {
	const [openReceipients, setOpenReceipents] = useState(mailActions?.actionType === 'forward');
	const mailRecipientMapping = getMailReciepientMapping({ mailActions });

	const visibleReceipients = mailRecipientMapping.length * DEFAULT_VISIBLE_RECIEPIENTS;

	const emailReceipientProps = mailFunction({
		setErrorValue,
		emailState,
		setShowControl,
		showControl,
		setEmailState,
	});

	return (
		<>
			{isEmail && (
				<div className={styles.parent_reciepients} key={mailActions?.type}>
					<div
						className={styles.reciepents}
						style={{
							height: openReceipients
								? `${visibleReceipients * DEFAULT_HEIGHT}px` : '0',
						}}
					>
						{mailRecipientMapping.map((eachItem) => {
							const { label = '', value = '' } = eachItem || {};

							return (
								<div key={value} className={styles.child_flex}>
									<div className={styles.label}>
										{label}
										:
									</div>
									<MailRecipientType
										{...emailReceipientProps}
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
						<div className={styles.subject}>
							<div className={styles.label}>
								Sub:
							</div>
							<Input
								value={emailState?.subject}
								onChange={(e) => setEmailState((p) => ({ ...p, subject: e }))}
								size="xs"
								className={styles.styled_input}
							/>
						</div>
						<Button
							size="md"
							themeType="linkUi"
							onClick={() => setOpenReceipents((p) => !p)}
						>
							{openReceipients ? 'hide' : 'cc'}
						</Button>
					</div>
				</div>
			)}
			<div
				className={cl`${styles.nofile_container}
				${((hasUploadedFiles) || uploading?.[id]) ? styles.upload_file_container : ''}`}
			>
				{(hasUploadedFiles) && !uploading?.[id] && (
					<UploadedFiles
						uploadedFiles={fileMetaData}
						id={id}
						setDraftUploadedFiles={setDraftUploadedFiles}
						uploaderRef={uploaderRef}
					/>
				)}
				{uploading?.[id] && (
					<div className={styles.uploading}>uploading.....</div>
				)}
			</div>
		</>
	);
}

export default FooterHead;
