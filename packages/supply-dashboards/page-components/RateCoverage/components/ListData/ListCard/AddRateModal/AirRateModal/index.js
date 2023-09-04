/* eslint-disable max-lines-per-function */
import { Button, Toast } from '@cogoport/components';
import {
	DatepickerController,
	InputController,
	SelectController,
	asyncFieldsLocations,
	asyncFieldsOperators,
	asyncFieldsOrganization,
	asyncFieldsOrganizationUsers,
	asyncFieldsOrganizations,
	asyncFieldsPartnerUsersIds,
	useForm,
	useGetAsyncOptions,
} from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import React, { useEffect } from 'react';

import {
	PackagingTypeOptions,
	PriceTypeOptions,
	RateTypeOptions,
	commodityOptions,
	currencyOptions,
	flighOperationTypeOptions,
	handlingtype,
	densityCargoOptions,
	densityRatioOptions,
} from '../../../../../helpers/constants';
import useCreateFreightRate from '../../../../../hooks/useCreateFreightRate';
import useDeleteRateJob from '../../../../../hooks/useDeleteRateJob';

import styles from './styles.module.css';

const date = GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'];
const time = GLOBAL_CONSTANTS.formats.time['HH:mm'];

function AirRateModal({ data = {}, setShowModal = () => {} }) {
	// const { control, watch, formState:{ errors = {} }, handleSubmit, setValue, resetField } = useForm();
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user: { id: user_id = '' } = {} } = user_data;

	const { control, watch, formState:{ errors = {} }, handleSubmit, setValue } = useForm();
	const formControls = watch();

	const originLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type: 'airport' } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));

	const destinationLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type: 'airport' } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));

	const airLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type: 'airline' } } },
	));

	const serviceProviderOptions = useGetAsyncOptions(
		merge(
			asyncFieldsOrganization(),
			{ params: { filters: { account_type: 'service_provider', kyc_status: 'verified' } } },
		),
	);

	const shipperOptions = useGetAsyncOptions(merge(asyncFieldsOrganizations(), {
		params   : { filters: { account_type: 'importer_exporter', status: 'active' } },
		includes : { default_params_required: true },
		labelKey : 'business_name',
	}));

	const listOrganizationUserOptions = useGetAsyncOptions(
		merge(
			asyncFieldsOrganizationUsers(),
			{ params: { filters: { organization_id: formControls?.service_provider } } },
		),
	);

	const listPartnerUserOptions = useGetAsyncOptions(
		merge(
			asyncFieldsPartnerUsersIds(),
			{ params: { filters: { organization_id: formControls?.service_provider } } },
		),
	);

	const { createRate } = useCreateFreightRate('air_freight');

	const { deleteRateJob } = useDeleteRateJob('air_freight');

	const onSubmit = async (val) => {
		const rate_id = await createRate(val);
		if (!rate_id) {
			return;
		}
		const succ_id = await deleteRateJob({ rate_id, data: val, id: data?.id });
		if (succ_id) {
			Toast.success('Rate created successfully');
			setShowModal(false);
		}
	};

	useEffect(() => {
		setValue('origin_airport', data?.origin_airport?.id);
		setValue('destination_airport', data?.destination_airport?.id);
		setValue('commodity', data?.commodity);
		setValue('handling_type', data?.stacking_type);
		setValue('air_line', data?.airline?.id);
		setValue('packaging_type', data?.shipment_type);
		setValue('flight_operation_type', data?.operation_type);
		setValue('rate_procured_by_cogoport_agent', user_id);
	}, [data, setValue, user_id]);

	return (
		<div style={{ padding: '20px' }}>
			<div className={styles.sub_container}>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Rate type</p>
					<div>
						<SelectController
							options={RateTypeOptions}
							control={control}
							name="rate_type"
							placeholder="Select Rate Type"
							rules={{ required: 'rate type is required' }}
						/>
					</div>
					<p className={styles.error_message}>{errors?.rate_type ? errors?.rate_type?.message : ''}</p>
				</div>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Origin Airport</p>
					<div>
						<SelectController
							{...originLocationOptions}
							control={control}
							name="origin_airport"
							disabled
							placeholder="Select Origin"
							rules={{ required: 'origin airport is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.origin_airport ? errors?.origin_airport?.message : ''}
					</p>
				</div>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Destination Airport</p>
					<div>
						<SelectController
							{...destinationLocationOptions}
							control={control}
							disabled
							name="destination_airport"
							placeholder="Select Destination"
							rules={{ required: 'destination airport is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.destination_airport ? errors?.destination_airport?.message : ''}
					</p>
				</div>
			</div>
			<div className={styles.sub_container}>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Service Provider</p>
					<div>
						<SelectController
							{...serviceProviderOptions}
							control={control}
							value={data?.service_provider?.id}
							name="service_provider"
							placeholder="Select service provider"
							rules={{ required: 'service provider is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.service_provider ? errors?.service_provider?.message : ''}
					</p>
				</div>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Rate Provided By LSP User</p>
					<div>
						<SelectController
							{...listOrganizationUserOptions}
							control={control}
							name="rate_provided_by_lsp_user"
							placeholder="Rate Provided By LSP User"
							disabled={!formControls?.service_provider}
							rules={{ required: 'rate provided by lsp user is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.rate_provided_by_lsp_user ? errors?.rate_provided_by_lsp_user?.message : ''}
					</p>
				</div>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>
						Rate Procured by Cogoport Agent
					</p>
					<div>
						<SelectController
							{...listPartnerUserOptions}
							control={control}
							name="rate_procured_by_cogoport_agent"
							placeholder="Rate Procured by Cogoport Agent"
							rules={{ required: 'rate procured by agent is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.rate_procured_by_cogoport_agent
							? errors?.rate_procured_by_cogoport_agent?.message : ''}
					</p>
				</div>
			</div>
			<div className={styles.sub_container}>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Commodity</p>
					<div>
						<SelectController
							options={commodityOptions}
							control={control}
							name="commodity"
							disabled
							placeholder="commodity"
							rules={{ required: 'commodity is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.commodity ? errors?.commodity?.message : ''}
					</p>
				</div>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Air Line</p>
					<div>
						<SelectController
							{...airLineOptions}
							control={control}
							name="air_line"
							placeholder="air line"
							rules={{ required: 'air line is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.air_line ? errors?.air_line?.message : ''}
					</p>
				</div>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Flight Operation Type</p>
					<div>
						<SelectController
							options={flighOperationTypeOptions}
							control={control}
							name="flight_operation_type"
							placeholder="flight operation type"
							rules={{ required: 'flight operation type is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.flight_operation_type ? errors?.flight_operation_type?.message : ''}
					</p>
				</div>
			</div>
			<div className={styles.sub_container}>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Start Date</p>
					<div>
						<DatepickerController
							placeholder="Select Date"
							showTimeSelect
							dateFormat={`${date} ${time}`}
							name="startDateTime"
							isPreviousDaysAllowed
							control={control}
							rules={{ required: 'start date is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.startDateTime ? errors?.startDateTime?.message : ''}
					</p>
				</div>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>End Date</p>
					<div>
						<DatepickerController
							placeholder="Select Date"
							showTimeSelect
							dateFormat={`${date} ${time}`}
							name="endDateTime"
							isPreviousDaysAllowed
							control={control}
							rules={{ required: 'end date is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.endDateTime ? errors?.endDateTime?.message : ''}
					</p>
				</div>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Packaging Type</p>
					<div>
						<SelectController
							options={PackagingTypeOptions}
							control={control}
							name="packaging_type"
							placeholder="packaging type"
							rules={{ required: 'packaging type is required' }}

						/>
					</div>
					<p className={styles.error_message}>
						{errors?.packaging_type ? errors?.packaging_type?.message : ''}
					</p>
				</div>
			</div>
			<div className={styles.sub_container}>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Handling Type</p>
					<div>
						<SelectController
							options={handlingtype}
							control={control}
							name="handling_type"
							placeholder="handling type"
							rules={{ required: 'handling type is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.handling_type ? errors?.handling_type?.message : ''}
					</p>
				</div>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Minimum Price</p>
					<div>
						<InputController
							options={RateTypeOptions}
							control={control}
							name="minimum_price"
							placeholder="Minimum Price"
							type="number"
							rules={{
								required: 'minimum price is required',
							}}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.minimum_price ? errors?.minimum_price?.message : ''}
					</p>
				</div>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Currency</p>
					<div>
						<SelectController
							options={currencyOptions}
							control={control}
							name="currency"
							placeholder="Select Currency"
							rules={{ required: 'currency is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.currency ? errors?.currency?.message : ''}
					</p>
				</div>
			</div>
			<div className={styles.sub_container}>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Price Type</p>
					<div>
						<SelectController
							options={PriceTypeOptions}
							control={control}
							value="net"
							name="price_type"
							placeholder="Price Type"
							rules={{ required: 'price type is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.price_type ? errors?.price_type?.message : ''}
					</p>
				</div>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Density Cargo</p>
					<div>
						<SelectController
							options={densityCargoOptions}
							control={control}
							value="high_density"
							name="density_cargo"
							disabled
							placeholder="Density Cargo"
							rules={{ required: 'density cargo is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.density_cargo ? errors?.density_cargo?.message : ''}
					</p>
				</div>
				<div style={{ width: '30%' }}>
					<p className={styles.label_text}>Density Ratio</p>
					<div>
						<SelectController
							options={densityRatioOptions}
							control={control}
							name="density_ratio"
							value="1_500"
							disabled
							placeholder="Density Ratio"
							rules={{ required: 'density ratio is required' }}
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.density_ratio ? errors?.density_ratio?.message : ''}
					</p>
				</div>
			</div>
			<div className={styles.sub_container}>
				<div style={{ width: '30%' }}>
					<span className={styles.label_text}>Shipper</span>
					<span className={styles.optional_message}>(Optional)</span>
					<div>
						<SelectController
							{...shipperOptions}
							control={control}
							name="shipper"
							placeholder="Select shipper"
						/>
					</div>
					<p className={styles.error_message}>
						{errors?.shipper ? errors?.shipper?.message : ''}
					</p>
				</div>
			</div>
			<div className={styles.sub_container}>
				<div style={{ width: '100%' }}>
					<p className={styles.label_text}>Weight Slabs (in Kgs)</p>
					<div style={{ display: 'flex', width: '100%' }}>
						<div style={{ width: '10%', marginRight: '12px' }}>
							<InputController
								control={control}
								name="lower_limit"
								placeholder="Lower limit"
							/>
						</div>
						<div style={{ width: '10%', marginRight: '12px' }}>
							<InputController
								control={control}
								name="upper_limit"
								placeholder="Upper limit"
							/>
						</div>
						<div style={{ width: '10%' }}>
							<InputController
								control={control}
								name="price_per_unit"
								placeholder="Price Per Unit"
							/>
						</div>
					</div>
				</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button onClick={handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</div>
	);
}

export default AirRateModal;
