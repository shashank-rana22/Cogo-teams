import { isInList, validateEmail } from '../constants/MAIL_CONSTANT';

function mailFunction({
	type = '',
	setErrorValue = () => {},
	recipientValue = '',
	ccBccValue = '',
	setError = () => {},
	recipientArray = [],
	bccArray = [],
	setRecipientArray = () => {},
	setRecipientValue = () => {},
	setType = () => {},
	setShowControl = () => {},
	setBccArray = () => {},
	setCcBccValue = () => {},
	checkType,
	setAttachments = () => {},
	setEmailState = () => {},
	setShowMailModal = () => {},
	attachments = [],
	uploaderRef,
}) {
	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			if ((type === 'recipient' && !validateEmail(recipientValue))
			|| (type === 'cc_bcc' && !validateEmail(ccBccValue))) {
				setErrorValue('Enter valid id');
				setError(true);
				return;
			}
			if ((type === 'recipient' && isInList(recipientValue, recipientArray))
			|| (type === 'cc_bcc' && isInList(ccBccValue, bccArray))) {
				setErrorValue('Email already present');
				setError(true);
				return;
			}

			setError(false);
			setErrorValue(null);
			if (type === 'recipient') {
				setRecipientArray((prev) => [...prev, recipientValue]);
				setRecipientValue('');
				setType('');
				setShowControl(false);
			} else {
				setBccArray((prev) => [...prev, ccBccValue]);
				setCcBccValue('');
				setType('');
				setShowControl(false);
			}
		}
	};

	const handleEdit = (val) => {
		setType(val);
		setShowControl(true);
		setError(false);
		setErrorValue(null);
		if (type === 'recipient') {
			setCcBccValue('');
		} else {
			setRecipientValue('');
		}
	};

	const handleChange = (item) => {
		if (type === 'recipient') {
			setRecipientValue(item.target?.value);
		} else {
			setCcBccValue(item.target?.value);
		}
	};

	const handleDelete = (val, emailType) => {
		if (!checkType) {
			if (emailType === 'recipient') {
				setRecipientArray((p) => p.filter((data) => data !== val));
			} else {
				setBccArray((p) => p.filter((data) => data !== val));
			}
		}
	};

	const handleError = (s) => {
		setError(false);
		if (s === 'receipient') { setRecipientValue(''); } else { setCcBccValue(''); }
		setShowControl(false);
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

	return {
		handleKeyPress,
		handleEdit,
		handleChange,
		handleDelete,
		handleError,
		handleClose,
		handleAttachmentDelete,
	};
}

export default mailFunction;
