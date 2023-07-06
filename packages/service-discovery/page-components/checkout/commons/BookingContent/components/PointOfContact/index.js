import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateCheckout from '../../../../hooks/useUpdateCheckout';
import ChangeOpsExecutive from '../../../ChangeOpsExecutive';
import ContactDetails from '../../../ContactDetails';
import WhatsappNoVerificationModal from '../../../WhatsappNoVerificationModal';

import styles from './styles.module.css';

function PointOfContact({ bookingConfirmationMode = [], getCheckout, detail = {}, isChannelPartner }) {
	const {
		importer_exporter_poc = {},
		id,
		importer_exporter_poc_id = '',
		importer_exporter_branch_id = '',
		importer_exporter_id = '',
	} = detail || {};

	const [showWhatsappVerificationModal, setShowWhatsappVerificationModal] = useState(false);
	const [showEditContact, setShowEditContact] = useState(false);

	const {
		updateCheckout,
		updateLoading,
	} = useUpdateCheckout({ getCheckout });

	const onEditorAddContact = (values) => {
		updateCheckout({ values: { ...values, id } });
	};

	const handleWhatsappVerification = () => {
		updateCheckout({
			values: {
				importer_exporter_poc_id: importer_exporter_poc?.id,
				id,
			},
			closeFunction: setShowWhatsappVerificationModal,
		});
	};

	const isOpsExePresent = !isEmpty(importer_exporter_poc);

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<img
					src={GLOBAL_CONSTANTS.image_url.point_of_contact_png}
					alt="poclogo"
					width={44}
					height={44}
				/>

				{isOpsExePresent ? (
					<div className={styles.contact_details}>
						<ContactDetails
							bookingConfirmationMode={bookingConfirmationMode}
							importer_exporter_poc={importer_exporter_poc}
							setShowWhatsappVerificationModal={setShowWhatsappVerificationModal}
						/>
						<div className={styles.text}>This person will be contacted for shipment liasoning.</div>
					</div>

				) : <div>user not present</div>}
			</div>

			<Button
				type="button"
				size="md"
				themeType="secondary"
				onClick={() => setShowEditContact(true)}
			>
				Edit
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
	);
}

export default PointOfContact;
