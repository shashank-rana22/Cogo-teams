import { Modal, Button, Input } from '@cogoport/components';
import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ProfileNumberModal({
	setProfilevalue = () => {},
	profileValue = {},
	showAddNumber = false,
	handleSubmit = () => {},
	leadLoading = false,
	setShowAddNumber = () => {},
	showError = false,
	setShowError = () => {},
}) {
	const { name = '', number = '' } = profileValue || {};

	const CloseModal = () => {
		setShowAddNumber(false);
		setShowError(false);
		setProfilevalue({});
	};

	return (

		<Modal
			show={showAddNumber}
			size="sm"
			onClose={CloseModal}
			className={styles.styled_ui_modal_dialog}
			scroll={false}
		>
			<Modal.Header title="Profile Details" />
			<Modal.Body>
				<div className={styles.wrapper}>
					<div className={styles.styled_label}>Enter Name</div>
					<Input
						size="sm"
						placeholder="Enter name"
						value={name}
						onChange={(a) => setProfilevalue((p) => ({ ...p, name: a }))}
					/>
					<div className={styles.error_div}>
						{showError && isEmpty(name) && (
							<div className={styles.error_text}>Name is Required</div>
						)}
					</div>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.styled_label}>Enter Phone Number</div>
					<SelectMobileNumber
						value={profileValue}
						onChange={(val) => setProfilevalue(val)}
						inputType="number"
						inputId="+91"
					/>
					<div className={styles.error_div}>
						{showError && isEmpty(number) && (
							<div className={styles.error_text}>Number is Required</div>
						)}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="sm"
					themeType="accent"
					onClick={handleSubmit}
					disabled={leadLoading}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>

	);
}
export default ProfileNumberModal;
