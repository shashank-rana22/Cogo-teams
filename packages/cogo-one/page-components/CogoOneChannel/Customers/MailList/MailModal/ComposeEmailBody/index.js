import { RTEditor, Input, Select } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';

import { getUserActiveMails } from '../../../../../../configurations/mail-configuration';
import RTE_TOOL_BAR_CONFIG from '../../../../../../constants/rteToolBarConfig';

import Recipients from './Recipients';
import styles from './styles.module.css';

function ComposeEmailBody(props) {
	const {
		handleKeyPress = () => {},
		handleEdit = () => {},
		handleChange = () => {},
		handleDelete = () => {},
		handleCancel = () => {},
		handleAttachmentDelete = () => {},
		getDecodedData = () => {},
		userEmailAddress,
		setEmailState = () => {},
		userSharedMails = [],
		viewType = '',
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
			...getUserActiveMails({ userEmailAddress, viewType }),
			...(userSharedMails || []),
			...([emailState?.from_mail || activeMailAddress]),
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
				<RTEditor
					value={emailState?.body}
					onChange={(val) => setEmailState((p) => ({ ...p, body: val }))}
					className={styles.styled_editor}
					modules={{ toolbar: RTE_TOOL_BAR_CONFIG }}
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
