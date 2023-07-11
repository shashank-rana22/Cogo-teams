import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { DEFAULT_EMAIL_STATE } from '../constants/MAIL_CONSTANT';

import getFileAttributes from './getFileAttributes';

const LAST_INDEX = 1;

function mailFunction({
	setErrorValue = () => {},
	emailState = {},
	value = '',
	setValue = () => {},
	setShowControl = () => {},
	showControl,
	setAttachments = () => {},
	setEmailState = () => {},
	setButtonType = () => {},
	attachments = [],
	uploaderRef,
}) {
	const isInList = (email, data) => data?.includes(email);

	const validateEmail = (emailInput) => {
		const emailRegex = GLOBAL_CONSTANTS.regex_patterns.valid_email_regex;
		return emailRegex.test(emailInput);
	};

	const handleKeyPress = ({ e, type }) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (!validateEmail(value)) {
				setErrorValue('Enter valid id');
				return;
			}

			if (isInList(value, emailState?.[type] || [])) {
				setErrorValue('Email already present');
				return;
			}

			setErrorValue(null);
			setEmailState((prev) => ({
				...prev,
				[type]: [...(prev?.[type] || []), value],
			}));
			setShowControl(null);
		}
	};

	const handleEdit = (type) => {
		setShowControl(type);
		setErrorValue(null);
		setValue('');
	};

	const handleChange = ({ e, type }) => {
		if (showControl === type) {
			setValue(e.target?.value);
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

	const handleError = (type) => {
		if (showControl === type) {
			setValue('');
			setShowControl(null);
		}
	};

	const handleClose = () => {
		setAttachments([]);
		setEmailState(DEFAULT_EMAIL_STATE);
		setValue('');
		setButtonType('');
	};

	const handleAttachmentDelete = (url) => {
		const filteredAttachments = attachments.filter((data) => data !== url);
		setAttachments(filteredAttachments);
		uploaderRef?.current?.externalHandleDelete(filteredAttachments);
	};

	const decode = (data = '') => {
		const val = decodeURI(data).split('/');
		const fileName = val[val.length - LAST_INDEX];
		return getFileAttributes({ fileName, finalUrl: data });
	};

	return {
		handleKeyPress,
		handleEdit,
		handleChange,
		handleDelete,
		handleError,
		handleClose,
		handleAttachmentDelete,
		decode,
	};
}

export default mailFunction;
