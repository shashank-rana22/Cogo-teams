import { Input, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

import RTE_TOOL_BAR_CONFIG from '../../../../../../constants/rteToolBarConfig';
import getRenderEmailBody from '../../../../../../helpers/getRenderEmailBody';
import useImageUploader from '../../../../../../hooks/useImageUploader';

import EmailTemplates from './EmailTemplates';
import Recipients from './Recipients';
import ShipmentSubject from './ShipmentSubject';
import styles from './styles.module.css';
// eslint-disable-next-line custom-eslint/import-from-react, import/no-unresolved
import 'suneditor/dist/css/suneditor.min.css';

// eslint-disable-next-line import/no-unresolved
const SunEditor = dynamic(() => import('suneditor-react'), {
	ssr: false,
});

function ComposeEmailBody(props) {
	const {
		handleKeyPress = () => {},
		handleEdit = () => {},
		handleChange = () => {},
		handleDelete = () => {},
		handleCancel = () => {},
		handleAttachmentDelete = () => {},
		getDecodedData = () => {},
		setEmailState = () => {},
		errorValue = '',
		attachments = [],
		emailState = {},
		buttonType = '',
		activeMailAddress = '',
		showControl = null,
		uploading = false,
		setActiveMailAddress = () => {},
		mailProps = {},
		showOrgSpecificMail = false,
		signature = '',
		userActiveMails = [],
		hideFromMail = false,
		viewType = '',
		restrictMailToOrganizations = false,
		firestore = {},
	} = props || {};

	const { onImageUploadBefore, disableRTE } = useImageUploader();
	const sunEditorRef = useRef();

	const userActiveMailOptions = (userActiveMails || []).map(
		(curr) => ({ label: curr, value: curr }),
	);

	const getSunEditorInstance = (sunEditor) => {
		sunEditorRef.current = sunEditor;
	};

	const restrictMailToSingle = (
		buttonType === 'send_mail'
			&& restrictMailToOrganizations
			&& !emailState?.mailView
	);

	const handleRTEChange = (val) => {
		const rawText = sunEditorRef.current?.getText();

		setEmailState((p) => ({
			...p,
			rawRTEContent : rawText,
			rteContent    : val,
		}));
	};

	useEffect(() => {
		if (buttonType === 'send_mail' && !activeMailAddress) {
			setActiveMailAddress(userActiveMails?.[GLOBAL_CONSTANTS.zeroth_index]);
		}
	}, [activeMailAddress, buttonType, setActiveMailAddress, userActiveMails]);

	if (isEmpty(userActiveMails)) {
		return (
			<div className={styles.empty_view}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.no_email_permission}
					width={200}
					height={200}
					alt="email"
				/>
				<div className={styles.no_permission_text}>
					Sorry, You don&apos;t have active mails to send Mail.
				</div>
			</div>
		);
	}

	return (
		<>
			{hideFromMail
				? null
				: (
					<div className={styles.type_to}>
						<div className={styles.sub_text}>
							From:
						</div>
						<div className={styles.select_container}>
							<Select
								value={emailState?.from_mail || activeMailAddress}
								onChange={(val) => setEmailState((prev) => ({ ...prev, from_mail: val }))}
								disabled={buttonType !== 'send_mail'}
								options={userActiveMailOptions}
								size="sm"
							/>
						</div>
					</div>
				)}
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
				mailProps={mailProps}
				showOrgSpecificMail={showOrgSpecificMail}
				hideFromMail={hideFromMail}
				viewType={viewType}
				restrictMailToSingle={restrictMailToSingle}
				restrictMailToOrganizations={restrictMailToOrganizations}
				buttonType={buttonType}
				firestore={firestore}
			/>

			<div className={styles.type_to}>
				<div
					className={styles.sub_text}
					style={{ width: hideFromMail ? '30px' : '40px' }}
				>
					Sub:
				</div>

				{showOrgSpecificMail
					? (
						<ShipmentSubject
							emailState={emailState}
							setEmailState={setEmailState}
						/>
					)
					: (
						<Input
							value={emailState?.subject}
							onChange={(val) => setEmailState((p) => ({ ...p, subject: val }))}
							size="xs"
							placeholder="Enter your Subject"
							className={styles.styled_input}
						/>
					)}
			</div>

			{showOrgSpecificMail
				? <EmailTemplates mailProps={mailProps} />
				: null }

			<div className={styles.rte_container}>
				<SunEditor
					key={emailState?.reloadKey}
					onImageUploadBefore={onImageUploadBefore}
					defaultValue={emailState?.rteContent}
					onChange={handleRTEChange}
					setOptions={{
						buttonList    : RTE_TOOL_BAR_CONFIG,
						defaultTag    : 'div',
						minHeight     : '300px',
						showPathLabel : false,
					}}
					disable={disableRTE}
					autoFocus
					getSunEditorInstance={getSunEditorInstance}
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

				<div className={styles.preview_container}>
					<div className={styles.preview_label}>
						Signature:
					</div>

					<div
						className={styles.preview_body}
						dangerouslySetInnerHTML={{
							__html: getRenderEmailBody({ html: signature }),
						}}
					/>
				</div>
			</div>
		</>
	);
}

export default ComposeEmailBody;
