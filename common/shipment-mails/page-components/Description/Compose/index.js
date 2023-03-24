import { RTE } from '@cogoport/components';
import { useForm, handleError, InputController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetEntityStakeholderMappings from '../../../hooks/useGetEntityStakeholderMappings';
import useResetErrors from '../../../hooks/useResetErrors';

import Footer from './Footer';
import InputParam from './Input';
import SelectParam from './Select';
import styles from './styles.module.css';

const getFormattedValues = (emailData, action) => {
	const sender = emailData?.sender?.emailAddress?.address;

	if (action === 'forward' || action === 'send') {
		return {
			toUserEmail  : [],
			ccrecipients : [],
			subject      : emailData.subject || undefined,
		};
	}
	if (action === 'reply') {
		return {
			toUserEmail  : sender,
			ccrecipients : [],
			subject      : emailData.subject,
		};
	}
	const cc = (emailData?.ccRecipients || [])
		.map((item) => item?.emailAddress?.address)
		.join(', ');
	const to = (emailData?.toRecipients || [])
		.map((item) => item?.emailAddress?.address)
		.join(',');

	return {
		toUserEmail  : `${sender}, ${to}`,
		ccrecipients : cc,
		subject      : emailData.subject,
	};
};

function Compose({
	setComposingEmail,
	COMPOSE_EMAIL,
	action,
	composingEmail,
	pre_subject_text,
	subject_position,
}) {
	const defaultValues = getFormattedValues(composingEmail, action);
	const defaultCC = defaultValues.ccrecipients.length > 0;
	const [isCC, setIsCC] = useState(defaultCC);
	const [isBcc, setIsBcc] = useState(false);
	const [errors, setErrors] = useState({});
	const [editorState, setEditorState] = useState();
	const { options } = useGetEntityStakeholderMappings();

	const {
		control,
		handleSubmit,
		formState: { errors: errorVal },
		watch,
	} = useForm({ defaultValues });

	let actualSubject = watch('subject');
	const entity_type = watch('entity_type');

	if (pre_subject_text && subject_position === 'prefix') {
		actualSubject = `${pre_subject_text} / ${entity_type} / ${actualSubject}`;
	} else {
		actualSubject = `${actualSubject} / ${pre_subject_text} / ${entity_type}`;
	}

	useResetErrors({ errors, setErrors, currentStateErrors: errorVal });

	const suffix = (
		<div className={styles.row}>
			<div
				className={styles.suffix_button}
				role="button"
				tabIndex={0}
				onClick={() => setIsCC(!isCC)}
			>
				cc
			</div>
			<div
				className={styles.suffix_button}
				role="button"
				tabIndex={0}
				onClick={() => setIsBcc(!isBcc)}
			>
				bcc
			</div>
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<IcMArrowBack
					style={{ marginRight: 10, cursor: 'pointer' }}
					onClick={() => setComposingEmail(null)}
				/>
				New Email
			</div>

			<div className={styles.compose_container}>

				<div className={styles.user_email}>
					<InputParam
						prefix="To:"
						suffix={suffix}
						name="toUserEmail"
						control={control}
						placeholder="put comma (,) seperated multiple emails"
						rules={{ required: { value: true, message: 'Email is required' } }}
					/>
					{errors?.toUserEmail ? (
						<div className={styles.error}>
							{handleError(
								{ rules: { required: 'Emails are required' }, error: errors?.toUserEmail },
								true,
							)}
						</div>
					) : null}
				</div>

				{isCC ? (
					<InputParam
						prefix="Cc:"
						name="ccrecipients"
						control={control}
						placeholder="put comma (,) seperated multiple emails"
					/>
				) : null}
				{errors?.ccrecipients ? (
					<div className={styles.error}>
						{handleError(
							{ rules: { required: 'Emails are required' }, error: errors?.ccrecipients },
							true,
						)}
					</div>
				) : null}
				{isBcc
					? (
						<InputController
							prefix="Bcc:"
							name="bccrecipients"
							control={control}
							placeholder="put comma (,) seperated multiple emails"
						/>
					)
					: null}

				<InputParam
					prefix="Subject:"
					name="subject"
					placeholder="Enter subject..."
					control={control}
				/>
				{errors?.subject ? (
					<div className={styles.error}>
						{handleError(
							{ rules: { required: 'Emails are required' }, error: errors?.toUserEmail },
							true,
						)}
					</div>
				) : null}
				<SelectParam
					prefix="Mail Type:"
					name="entity_type"
					placeholder="Select Mail type..."
					control={control}
					options={options}
					rules={{ required: { value: true, message: 'Entity Type is required' } }}
				/>
				{errors?.entity_type ? (
					<div className={styles.error}>
						{handleError(
							{ rules: { required: 'Emails are required' }, error: errors?.toUserEmail },
							true,
						)}
					</div>
				) : null}
				<div className={styles.subject_preview}>
					<div className={styles.preview}>Subject Preview :</div>
					<div className={styles.preview}>
						{actualSubject}
					</div>
				</div>

				{errors?.subject ? (
					<div className={styles.error}>
						{handleError(
							{ rules: { required: 'Emails are required' }, error: errors?.toUserEmail },
							true,
						)}
					</div>
				) : null}

				<div className={styles.rich_text_editor}>

					<RTE
						className={styles.styled_editor}
						placeholder="Write Your mail here...."
						value={editorState}
						onChange={setEditorState}
					/>

				</div>

				<Footer
					content={editorState}
					subject="Testing the flow wait"
					COMPOSE_EMAIL={COMPOSE_EMAIL}
					handleSubmit={handleSubmit}
					onError={(err) => setErrors({ ...err })}
					action={action}
					composingEmail={composingEmail}
					onCreate={() => setComposingEmail(null)}
				/>
			</div>
		</div>
	);
}

export default Compose;
