import { Modal } from '@cogoport/components';
// import { Flex } from '@cogoport/front/components';
import { IcMEdit, IcCFtick } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import MobileNoVerificationModal from '../../MobileVerificationModal';

import EditPersonalDetails from './EditPersonalDetails';
import styles from './styles.module.css';

function PersonDetails({
	detailsData,
	refetch = () => {},
	setShowMobileVerificationModal = () => {},
	showMobileVerificationModal,
}) {
	const {
		profile: { mobile_verified = false, partner = {} },
	} = useSelector((state) => state);

	const { partner_user_id = '' } = partner || {};

	const {
		email,
		name,
		mobile_number,
		mobile_country_code,
		office_location,
		preferred_languages,
	} = detailsData || {};

	const { name: cityName } = office_location || {};

	const [showModal, setShowModal] = useState(false);

	const onClickVerifyMobileNoButton = () => {
		setShowMobileVerificationModal(true);
	};

	const onOuterClick = () => {
		setShowModal(false);
	};

	return (
		<>
			<div className={styles.card_container}>
				<div className={styles.header_text}> Personal Details</div>

				<div className={styles.head}>
					<div className={styles.label_value_container}>
						<div className={styles.label_text}> Name </div>
						<div className={styles.value_text}>
							:
							{name}
						</div>
					</div>
					<IcMEdit
						size={1.8}
						onClick={() => setShowModal(true)}
						style={{ cursor: 'pointer' }}
					/>
					<Modal
						show={showModal}
						onClose={() => setShowModal(false)}
						onOuterClick={onOuterClick}
						width={540}
					>
						<EditPersonalDetails
							detailsData={detailsData}
							setShowModal={setShowModal}
							refetch={refetch}
							partner_user_id={partner_user_id}
						/>
					</Modal>
				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label_text}> Email </div>
					<div className={styles.value_text}>
						:
						{email}
					</div>
				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label_text}> Mobile </div>
					<div className={styles.value_text}>
						:
						{mobile_country_code + mobile_number}
					</div>

					{mobile_verified ? <IcCFtick width={20} height={20} /> : null}
					<div
						className={styles.verify_text}
						role="presentation"
						onClick={() => onClickVerifyMobileNoButton()}
					>
						{mobile_verified ? 'Change' : 'Verify'}
					</div>
				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label_text}> Office Location </div>
					<div className={styles.value_text}>
						:
						{cityName}
					</div>
				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label_text}> Language </div>
					<div className={styles.value_text}>
						{/* <Flex wrap="wrap">
							:
							{preferred_languages?.map(
								(lang) => <div className={styles.languge_tag}>{startCase(lang)}</div>,
							)}
						</Flex> */}
						<div wrap="wrap">
							:
							{preferred_languages?.map(
								(lang) => <div className={styles.languge_tag}>{startCase(lang)}</div>,
							)}
						</div>
					</div>
				</div>
			</div>

			<div>
				<MobileNoVerificationModal
					selectedUser={detailsData}
					showMobileVerificationModal={showMobileVerificationModal}
					setShowMobileVerificationModal={setShowMobileVerificationModal}
				/>
			</div>
		</>
	);
}

export default PersonDetails;
