import Layout from '@cogoport/air-modules/components/Layout';
import { Button, Modal } from '@cogoport/components';
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';
import { useForm } from '@cogoport/forms';
// import { DateRangePickerController, InputController, SelectController, useForm } from '@cogoport/forms';
import React from 'react';

import useCreateFclFreightRate from '../../../../hooks/useCreateFclFreightRate';

import airControls from './AirControls';
import AirRateModal from './AirRateModal';
import fclControls from './FclControls';
// import styles from './styles.module.css';

function AddRateModal({
	showModal = true,
	setShowModal = () => {},
	filter = {},
	data = {},
}) {
	const FCL_CONTROLS = fclControls({ data, containerSizes, containerTypes });
	const AIR_CONTROLS = airControls();
	const finalControls = filter?.service === 'fcl_freight' ? FCL_CONTROLS : AIR_CONTROLS;
	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const values = watch();
	const newCotrols = [...finalControls];
	if (values?.service_provider_id) {
		// const newCotrols = [...finalControls];

		newCotrols.forEach((ctr) => {
			const newCtr = { ...ctr };
			if (newCtr.name === 'sourced_by_id') {
				newCtr.params.filters = {
					organization_id: values.service_provider_id,
				};
			}
		});
	}

	const { fclFreightRate } = useCreateFclFreightRate();
	const handleSubmitData = (dataa) => {
		fclFreightRate({ dataa });
	};
	console.log(values, newCotrols, 'newcontrols');
	return (
		<Modal show={showModal} onClose={() => { setShowModal((prev) => !prev); }} placement="top" size="xl">
			<Modal.Header title="Please add rate" />
			<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
				{filter?.service === 'fcl_freight' ? (
					<Layout
						fields={newCotrols}
						control={control}
						errors={errors}
					/>
				) : <AirRateModal data={data} />}
				{/* <p className={styles.bold_text} style={{ marginLeft: '20px' }}>Reasons</p>
				<Layout
					fields={newCotrols}
					control={control}
					errors={errors}
				/> */}
				{/* <AirRateModal data={data} /> */}

			</Modal.Body>
			<Modal.Footer>
				<div>
					<Button onClick={handleSubmit(handleSubmitData)}>
						Submit
					</Button>
					{/* <Button onClick={() => handleSubmit(handleSubmitData)}>
						Submit
					</Button> */}
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default AddRateModal;
