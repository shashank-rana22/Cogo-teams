import getFileAttributes from './getFileAttributes';

function mailFunction({
	setErrorValue = () => {},
	recipientArray = [],
	bccArray = [],
	setRecipientArray = () => {},
	value = '',
	setValue = () => {},
	setShowControl = () => {},
	showControl,
	setBccArray = () => {},
	setAttachments = () => {},
	setEmailState = () => {},
	setButtonType = () => {},
	attachments = [],
	uploaderRef,
}) {
	const isInList = (email, data) => data?.includes(email);

	const validateEmail = (emailInput) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(emailInput);
	};

	const handleKeyPress = ({ e, type }) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if ((type === 'recipient' && !validateEmail(value))
			|| (type === 'cc_bcc' && !validateEmail(value))) {
				setErrorValue('Enter valid id');
				return;
			}
			if ((type === 'recipient' && isInList(value, recipientArray))
			|| (type === 'cc_bcc' && isInList(value, bccArray))) {
				setErrorValue('Email already present');
				return;
			}

			setErrorValue(null);
			if (type === 'recipient') {
				setRecipientArray((prev) => [...prev, value]);
				setShowControl(null);
			} else {
				setBccArray((prev) => [...prev, value]);
				setShowControl(null);
			}
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
		if (emailType === 'recipient') {
			setRecipientArray((p) => p.filter((data) => data !== val));
		} else {
			setBccArray((p) => p.filter((data) => data !== val));
		}
	};

	const handleError = (type) => {
		if (showControl === type) {
			setValue('');
			setShowControl(null);
		}
	};

	const handleClose = () => {
		setAttachments([]);
		setBccArray([]);
		setEmailState({
			body    : '',
			subject : '',
		});
		setRecipientArray([]);
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
		const fileName = val[val.length - 1];
		const { uploadedFileName, fileIcon } = getFileAttributes({ fileName, finalUrl: data });
		return { uploadedFileName, fileIcon };
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
