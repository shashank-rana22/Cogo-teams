import { Button, Modal, Toast } from '@cogoport/components';
import {
	asyncFieldsListOperators,
	asyncFieldsLocations,
	asyncFieldsOrganization,
	asyncFieldsOrganizationUsers,
	asyncFieldsPartnerUsersIds,
	useForm,
	useGetAsyncOptions,
} from '@cogoport/forms';
import { FREIGHT_CONTAINER_COMMODITY_MAPPINGS } from '@cogoport/globalization/constants/commodities';
import { useSelector } from '@cogoport/store';
import { merge, startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';

import useGetMainPortsOptions from '../../../../../RfqEnquiries/hooks/useGetMainPortsOptions';
import Layout from '../../../../../RfqEnquiries/Layout';
import { DEFAULT_VALUE, DELTA_VALUE, FIVE_HUNDRED, VALUE_ONE } from '../../../../configurations/helpers/constants';
import useCreateFreightRate from '../../../../hooks/useCreateFreightRate';
import useDeleteRateJob from '../../../../hooks/useDeleteRateJob';
import useGetChargeCodes from '../../../../hooks/useGetChargeCodes';

import airControls from './AirControls';
import fclControls from './FclControls';
import styles from './styles.module.css';

const getCommodityOptions = (container_type = 'standard') => {
	const commodities = FREIGHT_CONTAINER_COMMODITY_MAPPINGS[container_type];
	return (commodities || []).map((commodity) => ({
		label : (commodity.split('-') || []).map((item) => parseFloat(item) || startCase(item)).join(' '),
		value : commodity,
	}));
};

function AddRateModal({
	showModal = true,
	setShowModal = () => {},
	filter = {},
	data = {},
	getStats = () => {},
	getListCoverage = () => {},
}) {
	const isAirService = filter?.service === 'air_freight';

	const { options:mainPortOptions1 } = useGetMainPortsOptions({ location_id: data?.origin_port?.id });
	const { options:mainPortOptions2 } = useGetMainPortsOptions({ location_id: data?.destination_port?.id });

	const type = (isAirService) ? 'airport' : 'seaport';
	const originLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));
	const destinationLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));

	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user: { id: user_id = '' } = {} } = user_data;

	const { list } = useGetChargeCodes({ service_name: 'fcl_freight_charges' });
	const chargeCodeOptions = list.map((item) => (
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
		setValue,
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

	const listAirLineOptions = useGetAsyncOptions(
		merge(
			asyncFieldsListOperators(),
			{
				params: {
					filters: {
						operator_type : 'airline',
						status        : 'active',
					},
				},
			},
		),
	);

	const listPartnerUserOptions = useGetAsyncOptions(
		merge(
			asyncFieldsPartnerUsersIds(),
			{
				params: {
					filters: {
						status: 'active',
					},
				},
			},
		),
	);
	const serviceProviders = useGetAsyncOptions(
		merge(
			asyncFieldsOrganization(),
			{
				params: {
					filters: {
						status       : 'active',
						service      : filter?.service,
						kyc_status   : 'verified',
						account_type : 'service_provider',
					},
				},
			},
		),
	);
	const organizationUsers = useGetAsyncOptions(
		merge(
			asyncFieldsOrganizationUsers(),
			{ params: { filters: { organization_id: values?.service_provider_id } } },
		),
	);

	const fclCommodityOptions = getCommodityOptions(values?.container_type);

	const finalControls = !isAirService ? fclControls({
		data,
		chargeCodeOptions,
		listShippingLineOptions,
		mainPortOptions1,
		mainPortOptions2,
		originLocationOptions,
		destinationLocationOptions,
		serviceProviders,
		organizationUsers,
		fclCommodityOptions,
	}) : airControls({
		data,
		listPartnerUserOptions,
		user_id,
		originLocationOptions,
		destinationLocationOptions,
		listAirLineOptions,
		serviceProviders,
		organizationUsers,
	});

	const showElements = {
		origin_main_port_id      : data?.origin_port?.is_icd,
		destination_main_port_id : data?.destination_port?.is_icd,
	};
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
		getStats();
		getListCoverage();
	};

	const freeWeight = values?.free_weight;
	const weightSlabs = values?.weight_slabs;

	const tmp = JSON.stringify(weightSlabs);

	useEffect(() => {
		if (!isAirService) {
			(weightSlabs || []).forEach((slab, index) => {
				if (index === DEFAULT_VALUE) {
					setValue('weight_slabs.0.lower_limit', Number(freeWeight) + DELTA_VALUE || DELTA_VALUE);
				} else {
					setValue(
						`weight_slabs.${index}.lower_limit`,
						Number(weightSlabs[index - VALUE_ONE].upper_limit) + DELTA_VALUE || DELTA_VALUE,
					);
				}
			});
		} else {
			(weightSlabs || []).forEach((slab, index) => {
				if (index === DEFAULT_VALUE) {
					setValue('weight_slabs.0.lower_limit', DELTA_VALUE);
					setValue('weight_slabs.0.upper_limit', FIVE_HUNDRED);
				} else {
					setValue(
						`weight_slabs.${index}.lower_limit`,
						Number(weightSlabs[index - VALUE_ONE].upper_limit) + DELTA_VALUE || DELTA_VALUE,
					);
				}
			});
		}
	}, [tmp, weightSlabs, isAirService, freeWeight, setValue]);

	return (
		<Modal show={showModal} onClose={() => { setShowModal((prev) => !prev); }} placement="top" size="xl">
			<Modal.Header title="Please Add Rate" />
			<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
				<Layout
					fields={finalControls}
					control={control}
					errors={errors}
					showElements={showElements}
				/>
				<div className={styles.submit_button}>
					<Button
						onClick={handleSubmit(handleSubmitData)}
					>
						Submit
					</Button>
				</div>

			</Modal.Body>

		</Modal>
	);
}
export default AddRateModal;
