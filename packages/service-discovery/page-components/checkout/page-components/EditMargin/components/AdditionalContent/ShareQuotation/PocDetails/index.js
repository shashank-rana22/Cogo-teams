import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import ChangeOpsExecutive from '../../../../../../commons/ChangeOpsExecutive';
import ContactDetails from '../../../../../../commons/ContactDetails';
import WhatsappNoVerificationModal from '../../../../../../commons/WhatsappNoVerificationModal';

import styles from './styles.module.css';

function PocDetails({
	detail,
	bookingConfirmationMode,
	showWhatsappVerificationModal,
	setShowWhatsappVerificationModal,
	isChannelPartner,
	updateCheckout = () => {},
	updateLoading,
}) {
	const [showEditContact, setShowEditContact] = useState(false);

	const {
		importer_exporter_poc = {},
		id,
		importer_exporter_poc_id = '',
		importer_exporter_branch_id = '',
		importer_exporter_id = '',
	} = detail || {};

	const onEditorAddContact = (values) => {
		updateCheckout({ values: { ...values, id } });
	};

	const handleWhatsappVerification = () => {
		updateCheckout({
			values: {
				importer_exporter_poc_id : importer_exporter_poc?.id,
				id                       : detail?.id,
			},
			closeFunction: setShowWhatsappVerificationModal,
		});
	};

	const isOpsExePresent = !isEmpty(importer_exporter_poc);

	return (
		<div className={styles.container}>
			<div className={styles.poc_details}>
				{isOpsExePresent ? (
					<ContactDetails
						bookingConfirmationMode={bookingConfirmationMode}
						importer_exporter_poc={importer_exporter_poc}
						setShowWhatsappVerificationModal={setShowWhatsappVerificationModal}
					/>
				) : null}

				<Button
					type="button"
					size="md"
					themeType="tertiary"
					className={styles.edit_button}
					onClick={() => setShowEditContact(true)}
				>
					Edit, or Add Contact
				</Button>

				{showEditContact ? (
					<ChangeOpsExecutive
						show={showEditContact}
						onClose={() => setShowEditContact(false)}
						onUpdate={onEditorAddContact}
						user_id={importer_exporter_id}
						data={{
							id                  : importer_exporter_poc_id,
							name                : importer_exporter_poc?.name,
							email               : importer_exporter_poc?.email,
							mobile_country_code : importer_exporter_poc?.mobile_country_code,
							mobile_number       : importer_exporter_poc?.mobile_number,
						}}
						branch_id={importer_exporter_branch_id}
						loading={updateLoading}
						isChannelPartner={isChannelPartner}
						setShowEditContact={setShowEditContact}
					/>
				) : null}

				<WhatsappNoVerificationModal
					source="checkout"
					selectedUser={detail?.importer_exporter_poc}
					handleWhatsappVerification={handleWhatsappVerification}
					showWhatsappVerificationModal={showWhatsappVerificationModal}
					setShowWhatsappVerificationModal={setShowWhatsappVerificationModal}
					source_id={detail?.id}
				/>
			</div>
		</div>
	);
}

export default PocDetails;
