/* eslint-disable no-unused-vars */
import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcCError } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateSchedule from '../../../../hooks/useUpdateSchedule';

import CargoAcknowledgmentModal from './CargoAcknowledgmentModal';
import controls from './controls';
import styles from './styles.module.css';

function TruckStatusUpdateModal({
	item = {},
	showTruckStatusModal = {},
	setShowTruckStatusModal = () => {},
	truckStatus = 'truck_in',
	listAPI = () => {},
	warehouseLocationId = '',
}) {
	const [showCargoAcknowledgmentModal, setShowCargoAcknowledgmentModal] = useState(false);

	const {
		control,
		watch,
		formState:{ errors = {} },
	} = useForm();

	const fileValue = watch('image_url')?.finalUrl;

	const {
		loading = false,
		handleUpdate = () => {},
		data,
	} = useUpdateSchedule({
		item,
		truckStatus,
		fileValue,
		listAPI,
		setShowTruckStatusModal,
		showTruckStatusModal,
		setShowCargoAcknowledgmentModal,
		warehouseLocationId,
	});

	return (
		<div>
			{(isEmpty(showTruckStatusModal) && !isEmpty(data) && (
				<CargoAcknowledgmentModal
					showCargoAcknowledgmentModal={showCargoAcknowledgmentModal}
					setShowCargoAcknowledgmentModal={setShowCargoAcknowledgmentModal}
					cargoData={data}
				/>
			))}
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
		</div>
	);
}

export default TruckStatusUpdateModal;
