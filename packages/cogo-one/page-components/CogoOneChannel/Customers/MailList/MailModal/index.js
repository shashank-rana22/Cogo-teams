import { cl, Modal, Button, Tags } from '@cogoport/components';
import { IcMSend, IcMAttach, IcMCross } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function MailModal({ showMailModal, setShowMailModal }) {
	const [showControl, setShowControl] = useState(false);
	const [type, setType] = useState('');
	const [recipientValue, setRecipientValue] = useState('');
	const [ccBccValue, setCcBccValue] = useState('');
	const [error, setError] = useState(false);
	const [recipientArray, setRecipientArray] = useState([]);
	const [bccArray, setBccArray] = useState([]);

	const renderHeader = () => (
		<>
			<div className={styles.send_icon}>
				<IcMSend />
			</div>
			<div className={styles.title}>New Message</div>
			<div className={styles.right_header}>
				<IcMAttach />
				<Button size="md" themeType="link" onClick={() => setShowMailModal(true)}>Cancel</Button>
			</div>
		</>
	);

	const handleEdit = (val) => {
		setType(val);
		setShowControl(true);
	};

	const handleChange = (item) => {
		if (type === 'recipient') {
			setRecipientValue(item.target?.value);
		} else {
			setCcBccValue(item.target?.value);
		}
	};

	const validateEmail = (emailInput) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(emailInput);
	};

	const handleKeyPress = (event) => {
		console.log(recipientValue);
		console.log(event.target.value);
		if (event.key === 'Enter') {
			event.preventDefault();
			console.log(validateEmail(recipientValue));
			if (!validateEmail(recipientValue)) {
				setError(true);
				return;
			}
			setError(false);
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

	const formatData = ({ data, color }) => {
		const recipientTags = [];
		(data || []).map((itm, index) => (
			recipientTags.push({
				key      : index,
				disabled : false,
				children : itm,
				prefix   : null,
				suffix   : null,
				color,
				tooltip  : false,
				closable : true,
			})
		));
		return recipientTags;
	};

	const handleDelete = (val, setValue) => {
		const formattedValue = val.map((item) => item?.children);
		setValue(formattedValue);
	};
	return (
		<Modal
			show={showMailModal}
			onClose={() => setShowMailModal(false)}
			onOuterClick={() => setShowMailModal(false)}
			size="lg"
			className={styles.styled_ui_modal_dialog}
			placement="top"
		>
			<Modal.Header title={renderHeader()} />
			<Modal.Body>
				<div className={styles.type_to}>
					<div className={styles.sub_text}>
						To:
						{' '}
					</div>
					<div className={styles.tags_div}>
						<Tags
							items={formatData({ data: recipientArray, color: '#FEF199' })}
							className={styles.styled_ui_tags_container}
							onItemsChange={(val) => handleDelete(val, setRecipientArray)}
						/>
					</div>
					{(showControl && type === 'recipient') && (
						<div className={styles.tag_container}>
							<input
								size="sm"
								placeholder="Enter recipient"
								type="text"
								value={recipientValue}
								onChange={(e) => handleChange(e)}
								onKeyPress={(e) => handleKeyPress(e)}
								className={cl`${error ? styles.error_input_container : styles.input_container}`}
								id="inputId"
							/>
							<div className={styles.cross_icon}>
								<IcMCross />
							</div>
						</div>
					)}
					<div
						className={styles.add_icon}
						onClick={() => handleEdit('recipient')}
						role="presentation"
					>
						+
					</div>
				</div>
				<div className={styles.type_to}>
					<div className={styles.sub_text}>
						Cc/Bcc, From:
						{' '}
					</div>
					<div className={styles.tags_div}>
						<Tags
							items={formatData({ data: bccArray, color: '#CFEAED' })}
							className={styles.styled_ui_tags_container}
							onItemsChange={(val) => handleDelete(val, setBccArray)}
						/>
					</div>
					{(showControl && type === 'cc_bcc') && (
						<div className={styles.tag_container}>
							<input
								size="sm"
								placeholder="Enter cc recipient"
								type="text"
								value={ccBccValue}
								onChange={(e) => handleChange(e)}
								onKeyPress={(e) => handleKeyPress(e)}
								className={styles.input_container}
							/>
							<div className={styles.cross_icon}>
								<IcMCross />
							</div>
						</div>
					)}
					<div
						className={styles.add_icon}
						onClick={() => handleEdit('cc_bcc')}
						role="presentation"
					>
						+
					</div>
				</div>
				<div className={styles.type_to}>
					<div className={styles.sub_text}>
						Subject:
						{' '}
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}
export default MailModal;
