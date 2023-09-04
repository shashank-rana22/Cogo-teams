import Layout from '@cogoport/air-modules/components/Layout';
import { Button, Modal } from '@cogoport/components';
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';
import { useForm } from '@cogoport/forms';
import React from 'react';

import useCreateFclFreightRate from '../../../../hooks/useCreateFclFreightRate';
import useDeleteRateJob from '../../../../hooks/useDeleteRateJob';
import useGetChargeCodes from '../../../../hooks/useGetChargeCodes';

import airControls from './AirControls';
import AirRateModal from './AirRateModal';
import fclControls from './FclControls';

function AddRateModal({
	showModal = true,
	setShowModal = () => {},
	filter = {},
	data = {},
}) {
	const SERVICE_NAME = 'fcl_freight_charges';
	const { list } = useGetChargeCodes({ service_name: SERVICE_NAME });
	const options = list.map((item) => (
		{
			label : item?.label,
			value : item?.value,
		}
	));
	const FCL_CONTROLS = fclControls({ data, containerSizes, containerTypes, options });
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
		newCotrols.forEach((ctr) => {
			const newCtr = { ...ctr };
			if (newCtr.name === 'sourced_by_id') {
				newCtr.params.filters = {
					organization_id: values.service_provider_id,
				};
			}
		});
	}

	const { fclFreightRate, fclData } = useCreateFclFreightRate();
	const { deleteRateJob } = useDeleteRateJob(filter?.service);
	const handleSubmitData = async (dataa) => {
		await fclFreightRate({ dataa });
		deleteRateJob({ rate_id: fclData?.id, data: dataa, id: data?.id });
	};
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
				) : <AirRateModal data={data} showModal={showModal} setShowModal={setShowModal} />}
			</Modal.Body>
			<Modal.Footer>
				<div>
					<Button onClick={handleSubmit(handleSubmitData)}>
						Submit
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default AddRateModal;
