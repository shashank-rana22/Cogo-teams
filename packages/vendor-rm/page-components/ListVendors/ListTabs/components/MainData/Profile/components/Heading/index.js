import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import FormLayout from '../../../../../../../../commons/components/FormLayout/FormLayout';
import useEditProfile from '../../hooks/useEditProfile';
import useResubmitKyc from '../../hooks/useResubmitKyc';

import styles from './styles.module.css';

const customStyle = {
	width         : '47%',
	marginRight   : '0px',
	formContainer : {
		display        : 'flex',
		justifyContent : 'space-between',
		flexWrap       : 'wrap',
	},
};

function Heading({
	data = {},
	refetchVendorInfo = () => {},
}) {
	const { vendor_details = {} } = data;

	const [showEditProfileModal, setShowEditProfileModal] = useState(false);
	const [showKycModal, setshowKycModal] = useState(false);

	const {
		control,
		newFields,
		handleSubmit,
		errors,
		onSubmit,
		editProfileLoading,
	} = useEditProfile({ vendor_details, refetchVendorInfo, setShowEditProfileModal, showEditProfileModal });

	const {
		newControls,
		controls_kyc,
		handleSubmitKyc,
		errors_kyc,
		loading,
		resubmitKYC,
		handleCompleteKyc,
	} = useResubmitKyc({ data, refetchVendorInfo, setshowKycModal });

	const { kyc_status = '' } = vendor_details || {};

	return (
		<div className={styles.top}>
			Profile

			<div className={styles.kyc_button_container}>
				{kyc_status === 'rejected' && (
					<Button
						className={styles.kyc_btn}
						size="md"
						themeType="accent"
						onClick={() => {
							setshowKycModal(!showEditProfileModal);
						}}
					>
						Resubmit KYC
					</Button>
				)}

				{kyc_status === 'pending_from_user' && (
					<Button
						className={styles.kyc_btn}
						size="md"
						themeType="accent"
						onClick={handleCompleteKyc}
					>
						Complete KYC
					</Button>
				)}

				{kyc_status !== 'verified' && (
					<Button
						size="md"
						themeType="secondary"
						onClick={() => {
							setShowEditProfileModal(!showKycModal);
						}}
					>
						Edit Profile
					</Button>
				)}
			</div>

			{showKycModal ? (
				<Modal
					show={showKycModal}
					size="lg"
					onClose={() => setshowKycModal(false)}
					className={styles.modal_container}
				>
					<Modal.Header title="Resubmit Rejected KYC Details" />

					<Modal.Body>
						<section
							className={styles.bodyStyle}
						>
							<FormLayout
								control={controls_kyc}
								fields={newControls}
								errors={errors_kyc}
								customStyle={customStyle}
							/>
						</section>
					</Modal.Body>

					<Modal.Footer>
						<Button
							size="md"
							style={{ marginRight: 10 }}
							themeType="secondary"
							onClick={() => {
								setshowKycModal(false);
							}}
							disabled={loading}
						>
							Cancel
						</Button>

						<Button
							size="md"
							type="submit"
							onClick={handleSubmitKyc(resubmitKYC)}
							loading={loading}
						>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}

			{showEditProfileModal ? (
				<Modal
					show={showEditProfileModal}
					size="lg"
					onClose={() => setShowEditProfileModal(false)}
					className={styles.modal_container}
				>
					<Modal.Header title="Edit Profile" />

					<Modal.Body>
						<section
							className={styles.bodyStyle}
						>
							<FormLayout
								control={control}
								fields={newFields}
								errors={errors}
							/>
						</section>
					</Modal.Body>

					<Modal.Footer>
						<Button
							size="md"
							style={{ marginRight: 10 }}
							themeType="secondary"
							onClick={() => {
								setShowEditProfileModal(false);
							}}
							disabled={editProfileLoading}
						>
							Cancel
						</Button>

						<Button
							size="md"
							type="submit"
							onClick={handleSubmit(onSubmit)}
							loading={editProfileLoading}
						>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default Heading;
