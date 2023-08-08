import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcCError } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import useUpdateSchedule from '../../../../hooks/useUpdateSchedule';

import controls from './controls';
import styles from './styles.module.css';

function TruckStatusUpdateModal({
	item = {},
	showTruckStatusModal = false,
	setShowTruckStatusModal = () => {},
	truckStatus = 'truck_in',
	listAPI = () => {},
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
	} = useUpdateSchedule({ item, truckStatus, fileValue, listAPI, setShowTruckStatusModal });

	return (
		<Modal
			show={!isEmpty(showTruckStatusModal)}
			onClose={() => setShowTruckStatusModal({})}
		>
			<Modal.Body>
				<div className={styles.header_container}>
					<h4 className={styles.warning_icon}>
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
					<Layout
						fields={controls}
						control={control}
						errors={errors}
					/>
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
