import { RTE } from '@cogoport/components';
import { useForm, handleError } from '@cogoport/forms';
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
	const [isBcc, setIsBcc] = useState(false);
	const [userEmailArray, setUserEmailArray] = useState([]);
	const [errors, setErrors] = useState({});
	const [editorState, setEditorState] = useState('');
	const { options } = useGetEntityStakeholderMappings();

	const {
		control,
		handleSubmit,
		formState: { errors: errorVal },
		setValue,
		watch,
	} = useForm({ defaultValues });

	let actualSubject = watch('subject');
	const entity_type = watch('entity_type');
	const userEmail = watch('toUserEmail');

	if (pre_subject_text && subject_position === 'prefix') {
		actualSubject = `${pre_subject_text} / ${entity_type} / ${actualSubject}`;
	} else {
		actualSubject = `${actualSubject} / ${pre_subject_text || ''} / ${entity_type}`;
	}

	useResetErrors({ errors, setErrors, currentStateErrors: errorVal });

	const suffix = (
		<div className={styles.row}>
			{!isBcc
			&& (
				<div
					className={styles.suffix_button}
					role="button"
					tabIndex={0}
					onClick={() => setIsBcc(!isBcc)}
				>
					Bcc
				</div>
			)}
		</div>
	);

	const handleClick = (e) => {
		if (e.keyCode === 13) {
			setUserEmailArray([
				...userEmailArray,
				userEmail,
			]);
			setValue('toUserEmail', '');
		}
	};

	// const handleDelete = (item) => {
	// 	const tempUserEmailArray = userEmailArray;
	// 	tempUserEmailArray.forEach((ele, idx) => {
	// 		if (ele === item) {
	// 			userEmailArray.splice(idx, 1);
	// 		}
	// 	});
	// 	setValue('toUserEmail', '');
	// 	setUserEmailArray(tempUserEmailArray);
	// };

	// const renderValue = () => userEmailArray.map((item) => (
	// 	<div style={{ display: 'flex' }}>
	// 		<div className={styles.value}>{item}</div>
	// 		<div
	// 			className={styles.cancel}
	// 			role="button"
	// 			tabIndex={0}
	// 			onClick={() => handleDelete(item)}
	// 		>
	// 			x
	// 		</div>
	// 	</div>
	// ));

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<IcMArrowBack
					className={styles.back_icon}
					style={{ marginRight: 10, cursor: 'pointer' }}
					onClick={() => setComposingEmail(null)}
				/>
				New Email
			</div>

			<div className={styles.compose_container}>

				<div className={styles.user_email}>
					<InputParam
						prefix="To :"
						suffix={suffix}
						name="toUserEmail"
						onKeyDown={(e) => handleClick(e)}
						emailValue={userEmailArray}
						setEmailValue={setUserEmailArray}
						setValue={setValue}
						// renderValue={renderValue}
						control={control}
						placeholder="Type here..."
						key={JSON.stringify(userEmailArray)}
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

				<div>
					<InputParam
						prefix="Cc :"
						name="ccrecipients"
						control={control}
						placeholder="Type here..."
					/>

					{errors?.ccrecipients ? (
						<div className={styles.error}>
							{handleError(
								{ rules: { required: 'Emails are required' }, error: errors?.ccrecipients },
								true,
							)}
						</div>
					) : null}
				</div>

				{isBcc
					? (
						<InputParam
							prefix="Bcc :"
							name="bccrecipients"
							control={control}
							placeholder="Type here..."
						/>
					)
					: null}

				<InputParam
					prefix="Subject :"
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

				<div className={styles.mail_type}>
					<SelectParam
						prefix="Mail Type :"
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
				</div>

				<div className={styles.subject_preview}>
					<div className={styles.subject_label}>Subject Preview :</div>
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
