import { RTE, Toast } from '@cogoport/components';
import { useForm, handleError } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMArrowBack } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetEntityStakeholderMappings from '../../../hooks/useGetEntityStakeholderMappings';

import Footer from './Footer';
import InputParam from './Input';
import SelectParam from './Select';
import styles from './styles.module.css';

const geo = getGeoConstants();

const DEFAULT_ZERO_VALUE = 0;
const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const getFormattedValues = (
	emailData,
	action,
	userEmailArray,
	setUserEmailArray,
	ccEmailArray,
	setCcEmailArray,
	deleteEmail,
) => {
	const sender = emailData?.sender?.emailAddress?.address;

	if (action === 'forward' || action === 'send') {
		return {
			toUserEmail  : '',
			ccrecipients : '',
			subject      : emailData.subject || undefined,
		};
	}
	if (action === 'reply' && userEmailArray?.length === DEFAULT_ZERO_VALUE && !deleteEmail) {
		setUserEmailArray([
			sender,
		]);
		return {
			toUserEmail  : '',
			ccrecipients : '',
			subject      : emailData.subject,
		};
	}

	const cc = (emailData?.ccRecipients || [])
		.map((item) => item?.emailAddress?.address);

	const to = (emailData?.toRecipients || [])
		.map((item) => item?.emailAddress?.address);

	if (userEmailArray?.length === DEFAULT_ZERO_VALUE && ccEmailArray?.length === DEFAULT_ZERO_VALUE && !deleteEmail) {
		setUserEmailArray([...to, sender]);
		setCcEmailArray(cc);
	}

	return {
		toUserEmail  : '',
		ccrecipients : '',
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
	const [isBcc, setIsBcc] = useState(false);
	const [userEmailArray, setUserEmailArray] = useState([]);
	const [ccEmailArray, setCcEmailArray] = useState([]);
	const [bccEmailArray, setBccEmailArray] = useState([]);
	const [deleteEmail, setDeleteEmail] = useState(false);
	const [editorState, setEditorState] = useState('');
	const source_options = (COMPOSE_EMAIL || []).map((email) => ({
		label : email,
		value : email,
	}));
	const { getEntityStakeholderApi } = useGetEntityStakeholderMappings();
	const options = (getEntityStakeholderApi.data || []).map((item) => ({
		label : item.description,
		value : item.description,
	}));

	options.push({ label: 'Other', value: 'Other' });

	const defaultValues = getFormattedValues(
		composingEmail,
		action,
		userEmailArray,
		setUserEmailArray,
		ccEmailArray,
		setCcEmailArray,
		deleteEmail,
	);

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({ defaultValues });

	let actualSubject = watch('subject');
	const entity_type = watch('entity_type');
	const userEmail = watch('toUserEmail');
	const ccEmail = watch('ccrecipients');
	const bccEmail = watch('bccrecipients');
	const sender_email = watch('composeEmail');
	if (pre_subject_text && subject_position === 'prefix') {
		actualSubject = `${pre_subject_text} / ${entity_type} / ${actualSubject}`;
	} else {
		actualSubject = `${actualSubject} / ${pre_subject_text || ''} / ${entity_type}`;
	}

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
		if ((e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE) && userEmail) {
			if (!geo.regex.EMAIL.test(userEmail)) {
				Toast.error('Please Enter Valid Email Address');
			} else {
				setUserEmailArray([
					...userEmailArray,
					userEmail,
				]);
				setValue('toUserEmail', '');
			}
		}
		if ((e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE) && ccEmail) {
			if (!geo.regex.EMAIL.test(ccEmail)) {
				Toast.error('Please Enter Valid Email Address');
			} else {
				setCcEmailArray([
					...ccEmailArray,
					ccEmail,
				]);
				setValue('ccrecipients', '');
			}
		}
		if ((e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE) && bccEmail) {
			if (!geo.regex.EMAIL.test(bccEmail)) {
				Toast.error('Please Enter Valid Email Address');
			} else {
				setBccEmailArray([
					...bccEmailArray,
					bccEmail,
				]);
				setValue('bccrecipients', '');
			}
		}
	};

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
				<div>
					<SelectParam
						prefix="Composing From :"
						name="composeEmail"
						emailValue={sender_email}
						setEmailValue={setComposingEmail}
						control={control}
						options={source_options}
						placeholder="Select Composing Email..."
						rules={{ required: 'Email is required' }}
					/>
				</div>
				<div className={styles.user_email}>
					<InputParam
						prefix="To :"
						suffix={suffix}
						name="toUserEmail"
						onKeyDown={(e) => handleClick(e)}
						emailValue={userEmailArray}
						setEmailValue={setUserEmailArray}
						setValue={setValue}
						control={control}
						setDeleteEmail={setDeleteEmail}
						placeholder="Type here..."
						rules={{ required: 'Emails are required' }}
					/>
					{errors?.toUserEmail ? (
						<div className={styles.error}>
							{handleError({ error: errors?.toUserEmail })}

						</div>
					) : null}
				</div>
				<div>
					<InputParam
						prefix="Cc :"
						name="ccrecipients"
						control={control}
						placeholder="Type here..."
						onKeyDown={(e) => handleClick(e)}
						emailValue={ccEmailArray}
						setEmailValue={setCcEmailArray}
						setValue={setValue}
						setDeleteEmail={setDeleteEmail}
					/>
				</div>

				{isBcc
					? (
						<InputParam
							prefix="Bcc :"
							name="bccrecipients"
							control={control}
							placeholder="Type here..."
							onKeyDown={(e) => handleClick(e)}
							emailValue={bccEmailArray}
							setEmailValue={setBccEmailArray}
							setValue={setValue}
							setDeleteEmail={setDeleteEmail}
						/>
					)
					: null}

				<InputParam
					prefix="Subject :"
					name="subject"
					placeholder="Enter subject..."
					control={control}
					rules={{ required: 'Subject is required' }}
				/>
				{errors?.subject ? (
					<div className={styles.error}>
						{handleError({ error: errors?.subject })}
					</div>
				) : null}

				<div className={styles.mail_type}>
					<SelectParam
						prefix="Mail Type :"
						name="entity_type"
						placeholder="Select Mail type..."
						control={control}
						options={options}
						rules={{ required: 'Entity Type is required' }}
					/>
					{errors?.entity_type ? (
						<div className={styles.error}>
							{handleError({ error: errors?.mail_type })}
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
						{handleError({ error: errors?.subject })}
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
					COMPOSE_EMAIL={sender_email}
					handleSubmit={handleSubmit}
					action={action}
					composingEmail={composingEmail}
					onCreate={() => setComposingEmail(null)}
					userEmailArray={userEmailArray}
					ccEmailArray={ccEmailArray}
					bccEmailArray={bccEmailArray}
				/>
			</div>
		</div>
	);
}

export default Compose;
