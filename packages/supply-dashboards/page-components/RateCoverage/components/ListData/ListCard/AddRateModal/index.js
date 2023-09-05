import Layout from '@cogoport/air-modules/components/Layout';
import { Button, Modal, Toast } from '@cogoport/components';
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';
import { asyncFieldsListOperators, asyncFieldsPartnerUsersIds, useForm, useGetAsyncOptions } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import React from 'react';

import useGetMainPortsOptions from '../../../../../RfqEnquiries/hooks/useGetMainPortsOptions';
import {
	flighOperationTypeOptions,
	PackagingTypeOptions, handlingtype,
	RateTypeOptions, currencyOptions, PriceTypeOptions, densityRatioOptions, densityCargoOptions, commodityOptions,
	fclCommodityOptions,
} from '../../../../helpers/constants';
import useCreateFreightRate from '../../../../hooks/useCreateFreightRate';
import useDeleteRateJob from '../../../../hooks/useDeleteRateJob';
import useGetChargeCodes from '../../../../hooks/useGetChargeCodes';

import airControls from './AirControls';
import fclControls from './FclControls';

function AddRateModal({
	showModal = true,
	setShowModal = () => {},
	filter = {},
	data = {},
}) {
	const mainPortOptions1 = useGetMainPortsOptions({ location_id: data?.origin_port?.id });
	const mainPortOptions2 = useGetMainPortsOptions({ location_id: data?.destination_port?.id });

	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user: { id: user_id = '' } = {} } = user_data;

	const SERVICE_NAME = 'fcl_freight_charges';
	const { list } = useGetChargeCodes({ service_name: SERVICE_NAME });
	const options = list.map((item) => (
		{
			label : item?.label,
			value : item?.value,
		}
	));

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const values = watch();

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

	const listPartnerUserOptions = useGetAsyncOptions(
		merge(
			asyncFieldsPartnerUsersIds(),
			{ params: { filters: { organization_id: values?.service_provider } } },
		),
	);

	const FCL_CONTROLS = fclControls({
		data,
		containerSizes,
		containerTypes,
		options,
		listShippingLineOptions,
		fclCommodityOptions,
		mainPortOptions1,
		mainPortOptions2,
	});
	const AIR_CONTROLS = airControls({
		data,
		flighOperationTypeOptions,
		PackagingTypeOptions,
		handlingtype,
		RateTypeOptions,
		currencyOptions,
		PriceTypeOptions,
		densityCargoOptions,
		densityRatioOptions,
		commodityOptions,
		listPartnerUserOptions,
		user_id,
	});
	const finalControls = filter?.service === 'fcl_freight' ? FCL_CONTROLS : AIR_CONTROLS;
	const newControls = [...finalControls];
	if (values?.service_provider_id) {
		newControls.forEach((ctr) => {
			const newCtr = { ...ctr };
			if (newCtr.name === 'sourced_by_id') {
				newCtr.params.filters = {
					organization_id: values.service_provider_id,
				};
			}
		});
	}
	const CONTROLS = [];
	(newControls || []).forEach((cntrl) => {
		if (cntrl.name === 'origin_main_port_id' && !data?.origin_port?.is_icd) {
			return;
		}
		if (cntrl.name === 'destination_main_port_id' && !data?.destination_port?.is_icd) {
			return;
		}
		CONTROLS.push(cntrl);
	});

	const { createRate } = useCreateFreightRate(filter?.service);
	const { deleteRateJob } = useDeleteRateJob(filter?.service);
	const handleSubmitData = async (formData) => {
		const rate_id = await createRate(formData);
		if (!rate_id) {
			return;
		}
		const id = await deleteRateJob({ rate_id, data: formData, id: data?.id });
		if (!id) { return; }
		Toast.success('Rate added successfully');
		setShowModal(false);
	};
	return (
		<Modal show={showModal} onClose={() => { setShowModal((prev) => !prev); }} placement="top" size="xl">
			<Modal.Header title="Please Add Rate" />
			<Modal.Body style={{ maxHeight: '600px', minHeight: '300px' }}>
				<Layout
					fields={CONTROLS}
					control={control}
					errors={errors}
				/>
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
