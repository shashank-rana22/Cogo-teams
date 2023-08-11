import { Button, Modal } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import React from 'react';

import { MAX_AMOUNT } from '../../hooks/useCreateFuelPayment';
import { details } from '../../utils/details';

import styles from './styles.module.css';

function CardModal({
	createFuelPayment = () => {},
	formValues = {},
	showModal = false,
	setShowModal = () => {},
	service = {},
	handleSubmit = () => {},
	loadingFuelPayment = false,
}) {
	const detailRows = details({ service, formValues });

	const finalSubmit = (values) => {
		createFuelPayment({
			values,
			service_id      : service?.id,
			successCallBack : () => setShowModal(false),
		});
	};

	return (
		<Modal
			size="md"
			show={showModal}
			onClose={() => setShowModal(false)}
		>
			<Modal.Header title="Alert!!" />
			<Modal.Body>
				<div className={styles.warning_container}>
					<IcMAlert height={50} width={50} color="#ee3425" />
					<h3>Are You Sure!!</h3>
				</div>
				<h4>
					Do you want to trigger fuel payment for :
				</h4>
				{detailRows.map((item) => (
					<div className={styles.detail_row} key={item?.key}>
						<div className={styles.label}>
							{item?.label}
							{' '}
							:
						</div>
						<div className={styles.value}>{item?.value}</div>
					</div>
				))}

			</Modal.Body>
			<Modal.Footer align="center">
				<div className={styles.footer_container}>
					<div className={styles.info}>
						<sup className={styles.asterisk_mark}>*</sup>
						{' '}
						Max allowed value will be minimum of 20% of ATH, fuel Amount and
						{' '}
						{MAX_AMOUNT}
						{' '}
					</div>
					<div className={styles.button_wrapper}>
						<Button
							themeType="secondary"
							size="md"
							onClick={() => setShowModal(false)}
							loading={loadingFuelPayment}
						>
							Cancel

						</Button>
						<Button
							themeType="accent"
							size="md"
							onClick={() => {
								handleSubmit(finalSubmit)();
							}}
							loading={loadingFuelPayment}
						>
							Submit

						</Button>
					</div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CardModal;
