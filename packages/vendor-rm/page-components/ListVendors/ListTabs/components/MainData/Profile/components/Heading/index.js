import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import FormLayout from '../../../../../../../../commons/components/FormLayout/FormLayout';
import useEditProfile from '../../hooks/useEditProfile';
import useResubmitKyc from '../../hooks/useResubmitKyc';

import styles from './styles.module.css';

function Heading1({
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
	} = useEditProfile({ vendor_details, refetchVendorInfo, setShowEditProfileModal });

	const {
		newControls,
		Control,
		handleSubmitKyc,
		Errors,
		ResubmitKYC,
	} = useResubmitKyc({ data, refetchVendorInfo, setshowKycModal });

	const { kyc_status = '' } = vendor_details || {};

	return (
		<div className={styles.top1}>
			Profile
			{kyc_status === 'rejected' && (
				<Button
					size="md"
					themeType="secondary"
					onClick={() => {
						setshowKycModal(!showEditProfileModal);
					}}
				>
					Resubmit KYC
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
							control={Control}
							fields={newControls}
							errors={Errors}
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
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
						onClick={handleSubmitKyc(ResubmitKYC)}
					>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>

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
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
						onClick={handleSubmit(onSubmit)}
						// loading={loading}
					>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Heading1;
