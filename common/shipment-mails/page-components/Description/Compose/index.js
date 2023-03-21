import getFormError from '@cogo/business-modules/helpers/get-form-error';
import useFormCogo from '@cogoport/front/hooks/useFormCogo';
import useEditorState from '@cogoport/front/rich-text/useEditorState';
import { IcMArrowBack } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import useGetEntityStakeholderMappings from '../../../hooks/useGetEntityStakeholderMappings';
import useResetErrors from '../../../hooks/useResetErrors';

import rawControls from './controls';
import Footer from './Footer';
import InputParam from './Input';
import SelectParam from './Select';
import {
	Container,
	Heading,
	ComposeContiner,
	Row,
	SuffixButton,
	Error,
	SubjectPreview,
	Preview,
} from './styles';

const Rte = dynamic(() => import('@cogoport/front/rich-text/RTE'), {
	ssr: false,
});

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
	const { options } = useGetEntityStakeholderMappings();
	const controls = rawControls.map((ctrl) => ({
		...ctrl,
		value: defaultValues[ctrl.name],
	}));
	const {
		fields,
		handleSubmit,
		formState: { errors: errorVal },
		watch,
	} = useFormCogo(controls);
	useResetErrors({ errors, setErrors, currentStateErrors: errorVal });

	const { editorState, setEditorState, HTMLState } = useEditorState();
	useEffect(() => () => {
		setComposingEmail(null);
	}, []);
	const suffix = (
		<Row>
			<SuffixButton onClick={() => setIsCC(!isCC)}>cc</SuffixButton>
			<SuffixButton onClick={() => setIsBcc(!isBcc)}>bcc</SuffixButton>
		</Row>
	);
	const handleChange = (state) => {
		setEditorState(state);
	};

	let actualSubject = watch('subject');
	const entity_type = watch('entity_type');

	if (pre_subject_text && subject_position === 'prefix') {
		actualSubject = `${pre_subject_text} / ${entity_type} / ${actualSubject}`;
	} else {
		actualSubject = `${actualSubject} / ${pre_subject_text} / ${entity_type}`;
	}

	return (
		<Container>
			<Heading>
				{' '}
				<IcMArrowBack
					style={{ marginRight: 10, cursor: 'pointer' }}
					onClick={() => setComposingEmail(null)}
				/>
				New Email
			</Heading>
			<ComposeContiner>
				<InputParam prefix="To:" suffix={suffix} {...fields.toUserEmail} />
				{errors?.toUserEmail ? (
					<Error>
						{getFormError(
							{ ...fields?.toUserEmail, error: errors?.toUserEmail },
							true,
						)}
					</Error>
				) : null}
				{isCC ? <InputParam prefix="Cc:" {...fields.ccrecipients} /> : null}
				{errors?.ccrecipients ? (
					<Error>
						{getFormError(
							{ ...fields?.ccrecipients, error: errors?.ccrecipients },
							true,
						)}
					</Error>
				) : null}
				{isBcc ? <InputParam prefix="Bcc:" /> : null}
				<InputParam prefix="Subject:" {...fields.subject} />
				{errors?.subject ? (
					<Error>
						{getFormError({ ...fields?.subject, error: errors?.subject }, true)}
					</Error>
				) : null}
				<SelectParam
					prefix="Mail Type:"
					{...fields.entity_type}
					options={options}
				/>
				{errors?.entity_type ? (
					<Error>
						{getFormError(
							{ ...fields?.entity_type, error: errors?.entity_type },
							true,
						)}
					</Error>
				) : null}
				<SubjectPreview>
					{' '}
					<Preview className="label">Subject Preview :</Preview>
					{' '}
					<Preview>
						{actualSubject}
						{' '}
					</Preview>
				</SubjectPreview>

				{errors?.subject ? (
					<Error>
						{getFormError(
							{ ...fields?.entity_type, error: errors?.entity_type },
							true,
						)}
					</Error>
				) : null}
				<Rte
					placeholder="Write here ...."
					editorState={editorState}
					setEditorState={setEditorState}
					onChange={handleChange}
				/>
				<Footer
					content={HTMLState}
					subject="Testing the flow wait"
					COMPOSE_EMAIL={COMPOSE_EMAIL}
					handleSubmit={handleSubmit}
					onError={(err) => setErrors({ ...err })}
					action={action}
					composingEmail={composingEmail}
					onCreate={() => setComposingEmail(null)}
				/>
			</ComposeContiner>
		</Container>
	);
}

export default Compose;
