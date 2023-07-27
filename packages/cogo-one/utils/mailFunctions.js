import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { DEFAULT_EMAIL_STATE } from '../constants/mailConstants';

import getFileAttributes from './getFileAttributes';

const LAST_INDEX = 1;

function mailFunction({
	setErrorValue = () => {},
	emailState = {},
	setShowControl = () => {},
	showControl = '',
	setAttachments = () => {},
	setEmailState = () => {},
	setButtonType = () => {},
	attachments = [],
	uploaderRef,
}) {
	const isInList = ({ email, data }) => data?.includes(email);

	const validateEmail = (emailInput) => {
		const emailRegex = GLOBAL_CONSTANTS.regex_patterns.email;
		return emailRegex.test(emailInput);
	};

	const handleKeyPress = ({
		event = {},
		type = '',
		email = '',
		newEmailInput = '',
		setNewEmailInput = () => {},
	}) => {
		if (event?.key === 'Enter' || email) {
			event?.preventDefault?.();
			const newEmail = email || newEmailInput;

			if (!validateEmail(newEmail)) {
				setErrorValue('Enter valid id');
				return;
			}

			const isEmailPresent = isInList({
				email : newEmail,
				data  : emailState?.[type] || [],
			});

			if (isEmailPresent) {
				setErrorValue('Email already present');
				return;
			}

			setErrorValue(null);
			setEmailState((prev) => ({
				...prev,
				[type]: [...(prev?.[type] || []), newEmail],
			}));
			setNewEmailInput('');
			setShowControl(null);
		}
	};

	const handleEdit = ({ type, setNewEmailInput }) => {
		setShowControl((p) => {
			if (p === type) {
				return null;
			}
			return type;
		});
		setErrorValue(null);
		setNewEmailInput('');
	};

	const handleChange = ({ val, type, setNewEmailInput }) => {
		if (showControl === type) {
			setNewEmailInput(val);
		}
	};

	const handleDelete = ({ val, emailType }) => {
		setEmailState((prev) => ({
			...prev,
			[emailType]: prev?.[emailType]?.filter(
				(data) => data !== val,
			),
		}));
	};

	const handleCancel = ({ type, setNewEmailInput }) => {
		if (showControl === type) {
			setNewEmailInput('');
			setShowControl(null);
		}
	};

	const handleClose = () => {
		setAttachments([]);
		setEmailState(DEFAULT_EMAIL_STATE);
		setButtonType('');
	};

	const handleAttachmentDelete = (url) => {
		const filteredAttachments = attachments.filter((data) => data !== url);
		setAttachments(filteredAttachments);
		uploaderRef?.current?.externalHandleDelete(filteredAttachments);
	};

	const getDecodedData = (data = '') => {
		const val = decodeURI(data).split('/');
		const fileName = val[val.length - LAST_INDEX];
		return getFileAttributes({ fileName, finalUrl: data });
	};

	return {
		handleKeyPress,
		handleEdit,
		handleChange,
		handleDelete,
		handleCancel,
		handleClose,
		handleAttachmentDelete,
		getDecodedData,
	};
}

export default mailFunction;
