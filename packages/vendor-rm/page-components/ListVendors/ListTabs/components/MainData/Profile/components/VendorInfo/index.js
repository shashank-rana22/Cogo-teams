import { Modal, Button } from '@cogoport/components';
import React from 'react';

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
	const {
		handleSubmit,
		errors,
		control,
		onSubmit,
		loading,
		controls,
		showAddbankModal,
		setShowAddbankModal,
	} = useVendorBankDetail({
		refetchVendorInfo,
	});

	return (
		<div className={styles.main}>

			<span className={styles.heading}>
				Vendor Details
			</span>
			<VendorDetailsInfo data={data} />

			<hr className={styles.hr} />

			<span className={styles.heading}>
				Vendor Services
			</span>
			<VendorServices data={data} />

			<hr className={styles.hr} />

			<span className={styles.heading}>
				Payment Details
			</span>
			<PaymentDetails data={data} />

			<hr className={styles.hr} />

			<Button
				size="md"
				type="button"
				themeType="secondary"
				onClick={() => {
					setShowAddbankModal(!showAddbankModal);
				}}
			>
				Add Bank Account
			</Button>

			{showAddbankModal ? (
				<Modal
					show={showAddbankModal}
					size="lg"
					onClose={() => setShowAddbankModal(false)}
				>
					<Modal.Header title="Edit Profile" />

					<Modal.Body>
						<section>
							<FormLayout control={control} fields={controls} errors={errors} />
						</section>
					</Modal.Body>

					<Modal.Footer>
						<Button
							size="md"
							type="button"
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
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default VendorInfo;
