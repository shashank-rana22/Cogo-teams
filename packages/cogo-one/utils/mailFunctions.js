import getFileAttributes from './getFileAttributes';

function mailFunction({
	type = '',
	setErrorValue = () => {},
	recipientValue = '',
	ccBccValue = '',
	recipientArray = [],
	bccArray = [],
	setRecipientArray = () => {},
	setRecipientValue = () => {},
	setType = () => {},
	setShowToControl = () => {},
	setShowCcControl = () => {},
	setBccArray = () => {},
	setCcBccValue = () => {},
	setAttachments = () => {},
	setEmailState = () => {},
	setShowMailModal = () => {},
	attachments = [],
	uploaderRef,
}) {
	const isInList = (email, data) => data?.includes(email);

	const validateEmail = (emailInput) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(emailInput);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			if ((type === 'recipient' && !validateEmail(recipientValue))
			|| (type === 'cc_bcc' && !validateEmail(ccBccValue))) {
				setErrorValue('Enter valid id');
				return;
			}
			if ((type === 'recipient' && isInList(recipientValue, recipientArray))
			|| (type === 'cc_bcc' && isInList(ccBccValue, bccArray))) {
				setErrorValue('Email already present');
				return;
			}

			setErrorValue(null);
			if (type === 'recipient') {
				setRecipientArray((prev) => [...prev, recipientValue]);
				setRecipientValue('');
				setType('');
				setShowToControl(false);
				setShowCcControl(false);
			} else {
				setBccArray((prev) => [...prev, ccBccValue]);
				setCcBccValue('');
				setType('');
				setShowToControl(false);
				setShowCcControl(false);
			}
		}
	};

	const handleEdit = (val) => {
		setType(val);
		if (val === 'recipient') {
			setShowToControl(true);
			setCcBccValue('');
			setShowCcControl(false);
		} else {
			setShowCcControl(true);
			setRecipientValue('');
			setShowToControl(false);
		}
		setErrorValue(null);
	};

	const handleChange = (item) => {
		if (type === 'recipient') {
			setRecipientValue(item.target?.value);
		} else {
			setCcBccValue(item.target?.value);
		}
	};

	const handleDelete = ({ val, emailType }) => {
		if (emailType === 'recipient') {
			setRecipientArray((p) => p.filter((data) => data !== val));
		} else {
			setBccArray((p) => p.filter((data) => data !== val));
		}
	};

	const handleError = (s) => {
		if (s === 'recipient') {
			setShowToControl(false);
			setRecipientValue('');
		} else {
			setCcBccValue('');
			setShowCcControl(false);
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
		setRecipientValue('');
		setCcBccValue('');
		setShowMailModal(false);
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
