/* eslint-disable no-unused-vars */
import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcCError } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import controls from '../../../../configurations/truck-status-update-modal-controls';
import useUpdateSchedule from '../../../../hooks/useUpdateSchedule';

import styles from './styles.module.css';

function TruckStatusUpdateModal({
	item = {},
	showTruckStatusModal = {},
	setShowTruckStatusModal = () => {},
	setAcknowlegmentData = () => {},
	setShowCargoAcknowledgmentModal = () => {},
	truckStatus = 'truck_in',
	listAPI = () => {},
	warehouseLocationId = '',
}) {
	const {
		control,
		watch,
		formState:{ errors = {} },
	} = useForm();

	const fileValue = watch('image_url')?.finalUrl;

	const {
		loading = false,
		handleUpdate = () => {},
	} = useUpdateSchedule({
		item,
		truckStatus,
		fileValue,
		listAPI,
		setAcknowlegmentData,
		setShowTruckStatusModal,
		showTruckStatusModal,
		setShowCargoAcknowledgmentModal,
		warehouseLocationId,
	});

	return (
		<Modal
			show={!isEmpty(showTruckStatusModal)}
			onClose={() => setShowTruckStatusModal({})}
			placement="center"
		>
			<Modal.Body>
				<div className={styles.header_container}>
					<h4>
						<IcCError />
					</h4>
					<div className={styles.heading}>
						{truckStatus === 'truck_in'
							? <p>TRUCK IN</p> : <p>FINAL TRUCK OUT</p>}
					</div>
				</div>
				<>
					<div className={styles.modal_span}>
						Before Proceeding to final step kindly update the Truck proof
					</div>
					<div className={styles.upload_container}>
						<Layout
							fields={controls}
							control={control}
							errors={errors}
						/>
					</div>
				</>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className={styles.cancel_button}
					onClick={() => setShowTruckStatusModal({})}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					disabled={loading}
					onClick={handleUpdate}
				>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default TruckStatusUpdateModal;
