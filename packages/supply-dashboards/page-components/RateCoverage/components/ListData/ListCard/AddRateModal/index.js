import Layout from '@cogoport/air-modules/components/Layout';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
// import { DateRangePickerController, InputController, SelectController, useForm } from '@cogoport/forms';
import React from 'react';

import airControls from './AirControls';
import fclControls from './FclControls';
import styles from './styles.module.css';

function AddRateModal({
	showModal = true,
	setShowModal = () => {},
	filter = {},
	data = {},
}) {
	const FCL_CONTROLS = fclControls({ data });
	const AIR_CONTROLS = airControls();
	const finalControls = filter?.service === 'fcl_freight' ? FCL_CONTROLS : AIR_CONTROLS;
	const {
		control,
		formState: { errors },
	} = useForm();
	return (
		<Modal show={showModal} onClose={() => { setShowModal((prev) => !prev); }} placement="top" size="xl">
			<Modal.Header title="Please add rate" />
			<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
				<p className={styles.bold_text} style={{ marginLeft: '20px' }}>Reasons</p>
				<Layout
					fields={finalControls}
					control={control}
					errors={errors}
				/>

			</Modal.Body>
			<Modal.Footer>
				<div>
					<Button>
						Submit
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default AddRateModal;
