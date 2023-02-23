import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import FormLayout from '../../../../../../../../commons/components/FormLayout/FormLayout';
import useVendorBankDetail from '../../hooks/useVendorBankDetail';

import PaymentDetails from './components/PaymentDetails';
import VendorDetailsInfo from './components/VendorDetailsInfo';
import VendorServices from './components/VendorServices';
import styles from './styles.module.css';

function VendorInfo({
	data = {},
	refetchVendorInfo = () => {},
}) {
	const [showAddbankModal, setShowAddbankModal] = useState(false);

	const {
		handleSubmit,
		errors,
		control,
		onSubmit,
		loading,
		controls,
	} = useVendorBankDetail({
		refetchVendorInfo,
		setShowAddbankModal,
	});

	return (
		<div className={styles.main}>

			<span className={styles.heading}>
				Vendor Details
			</span>
			<VendorDetailsInfo data={data} />
			<hr className={styles.dis} />

			<span className={styles.heading}>
				Vendor Services
			</span>
			<VendorServices data={data} />
			<hr className={styles.dis} />

			<span className={styles.heading}>
				Payment Details
			</span>
			<PaymentDetails data={data} />
			<hr className={styles.dis} />

			<Button
				size="md"
				themeType="secondary"
				onClick={() => {
					setShowAddbankModal(!showAddbankModal);
				}}
			>
				Add Bank Account

			</Button>

			<Modal
				show={showAddbankModal}
				size="lg"
				onClose={() => setShowAddbankModal(false)}
				className={styles.modal_container}
			>
				<Modal.Header title="Edit Profile" />
				<Modal.Body>
					<section className={styles.bodyStyle}>
						<FormLayout control={control} fields={controls} errors={errors} />
					</section>
				</Modal.Body>
				<Modal.Footer>
					<Button
						size="md"
						style={{ marginRight: 10 }}
						themeType="secondary"
						onClick={() => {
							setShowAddbankModal(false);
						}}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						size="md"
						onClick={handleSubmit(onSubmit)}
						loading={loading}
					>
						submit
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default VendorInfo;
