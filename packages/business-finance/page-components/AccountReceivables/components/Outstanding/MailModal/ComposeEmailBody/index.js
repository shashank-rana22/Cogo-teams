/* eslint-disable import/no-unresolved */
import { Input, Select } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';

import RTE_TOOL_BAR_CONFIG from '../mailConstants/rteToolBarConfig';

// eslint-disable-next-line custom-eslint/import-from-react
import 'suneditor/dist/css/suneditor.min.css';
import Recipients from './Recipients';
import styles from './styles.module.css';

const SunEditor = dynamic(() => import('suneditor-react'), {
	ssr: false,
});

function ComposeEmailBody(props) {
	const {
		handleKeyPress = () => { },
		handleEdit = () => { },
		handleChange = () => { },
		handleDelete = () => { },
		handleCancel = () => { },
		handleAttachmentDelete = () => { },
		getDecodedData = () => { },
		userEmailAddress,
		setEmailState = () => { },
		userSharedMails = [],
		errorValue = '',
		attachments = [],
		emailState = {},
		buttonType = '',
		activeMailAddress = '',
		showControl = null,
		uploading = false,
	} = props || {};

	const userActiveMails = (
		[...new Set([
			...([userEmailAddress]),
			...(userSharedMails || []),
		])]
	).map(
		(curr) => ({ label: curr, value: curr }),
	);

	return (
		<>
			<div className={styles.type_to}>
				<div className={styles.sub_text}>
					From:
				</div>
				<div className={styles.select_container}>
					<Select
						value={emailState?.from_mail || activeMailAddress}
						onChange={(val) => setEmailState((prev) => ({ ...prev, from_mail: val }))}
						disabled={buttonType !== 'send_mail'}
						options={userActiveMails}
						size="sm"
					/>
				</div>
			</div>
			<Recipients
				emailState={emailState}
				handleChange={handleChange}
				handleDelete={handleDelete}
				handleKeyPress={handleKeyPress}
				handleCancel={handleCancel}
				handleEdit={handleEdit}
				showControl={showControl}
				errorValue={errorValue}
				setEmailState={setEmailState}
			/>

			<div className={styles.type_to}>
				<div className={styles.sub_text}>
					Sub:
				</div>
				<Input
					value={emailState?.subject}
					onChange={(val) => setEmailState((p) => ({ ...p, subject: val }))}
					size="xs"
					placeholder="Enter your Subject"
					className={styles.styled_input}
				/>
			</div>

			<div className={styles.rte_container}>
				<SunEditor
					autoFocus={false}
					plugin=""
					value={emailState?.body}
					onChange={(val) => setEmailState((p) => ({ ...p, body: val }))}
					setOptions={{
						buttonList    : RTE_TOOL_BAR_CONFIG,
						defaultTag    : 'div',
						minHeight     : '300px',
						showPathLabel : false,
					}}
				/>

				<div className={styles.attachments_scroll}>
					{uploading && (
						<div className={styles.uploading}>
							Uploading...
						</div>
					)}

					{(attachments || []).map(
						(data) => {
							const { fileIcon = {}, fileName = '' } = getDecodedData(data) || {};

							return (
								<div
									className={styles.uploaded_files}
									key={fileName}
								>
									<div
										className={styles.uploaded_files_content}
										role="presentation"
										onClick={(e) => {
											e.stopPropagation();
											window.open(data, '_blank');
										}}
									>
										{fileIcon}
										<div className={styles.content_div}>
											{fileName}
										</div>
									</div>
									<IcMCross
										className={styles.cross_svg}
										onClick={(e) => {
											e.stopPropagation();
											handleAttachmentDelete(data);
										}}
									/>
								</div>
							);
						},
					)}
				</div>
			</div>
		</>
	);
}

export default ComposeEmailBody;
