import Layout from '@cogoport/air-modules/components/Layout';
import { Button, Modal, Toast } from '@cogoport/components';
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';
import { asyncFieldsListOperators, useForm, useGetAsyncOptions } from '@cogoport/forms';
import { merge } from '@cogoport/utils';
import React from 'react';

import { fclCommodityOptions } from '../../../../helpers/constants';
import useCreateFclFreightRate from '../../../../hooks/useCreateFclFreightRate';
import useDeleteRateJob from '../../../../hooks/useDeleteRateJob';
import useGetChargeCodes from '../../../../hooks/useGetChargeCodes';

import airControls from './AirControls';
// import AirRateModal from './AirRateModal';
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

	const listShippingLineOptions = useGetAsyncOptions(
		merge(
			asyncFieldsListOperators(),
			{
				params: {
					filters: {
						operator_type : 'shipping_line',
						status        : 'active',
					},
				},
			},
		),
	);

	const FCL_CONTROLS = fclControls({
		data, containerSizes, containerTypes, options, listShippingLineOptions, fclCommodityOptions,
	});
	const AIR_CONTROLS = airControls({ data });
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
		const succ_id = await deleteRateJob({ rate_id: fclData?.id, data: dataa, id: data?.id });
		if (succ_id) {
			Toast.success('Rate added successfully');
			setShowModal(false);
		}
	};
	return (
		<Modal show={showModal} onClose={() => { setShowModal((prev) => !prev); }} placement="top" size="xl">
			<Modal.Header title="Please add rate" />
			<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
				<Layout
					fields={newCotrols}
					control={control}
					errors={errors}
				/>
				{/* ) : (
					<AirRateModal
						data={data}
						setShowModal={setShowModal}
						handleSubmitData={handleSubmitData}
					/>
				)} */}
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
