// import { Flex } from '@cogoport/front/components';
import { IcCFtick, IcMCall, IcMEmail } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React from 'react';

import MobileNoVerificationModal from '../../MobileVerificationModal';

import styles from './styles.module.css';

function PersonDetails({
	detailsData,
	setShowMobileVerificationModal = () => {},
	showMobileVerificationModal,
}) {
	const {
		profile: { mobile_verified = false },
	} = useSelector((state) => state);

	const {
		email,
		// name,
		mobile_number,
		mobile_country_code,
		// office_location,
		preferred_languages,
	} = detailsData || {};

	// const { name: cityName } = office_location || {};

	const onClickVerifyMobileNoButton = () => {
		setShowMobileVerificationModal(true);
	};

	return (
		<>
			<div className={styles.card_container}>

				<div className={styles.label_value_container}>
					<div className={styles.value_text}>

						<div className={styles.flex}>
							{preferred_languages?.map(
								(lang) => <div className={styles.languge_tag}>{startCase(lang)}</div>,
							)}

						</div>

					</div>
				</div>

				<div>

					<div className={styles.label_value_container}>
						<div className={styles.label_text}>
							<IcMCall fill="#000000" style={{ marginTop: '4px' }} />
						</div>
						<div className={styles.value_text}>
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
						<div className={styles.label_text}>
							<IcMEmail fill="#000000" style={{ marginTop: '4px' }} />
						</div>
						<div className={styles.value_text}>
							{email}
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
