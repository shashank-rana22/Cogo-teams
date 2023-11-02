/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import useControls from '../../../../configurations/controls';
import { DEFAULT_VALUE, DELTA_VALUE, TWO_HUNDERD, VALUE_ONE } from '../../../../configurations/helpers/constants';
import FieldMutation from '../../../../configurations/helpers/mutation-fields';
import useCreateFreightRate from '../../../../hooks/useCreateFreightRate';
import useDeleteFreightRateFeedbacks from '../../../../hooks/useDeleteFreightRateFeedbacks';
import useDeleteFreightRateRequests from '../../../../hooks/useDeleteFreightRateRequests';
import useDeleteRateJob from '../../../../hooks/useDeleteRateJob';
import useGetFreightRate from '../../../../hooks/useGetFreightRate';
import useUpdateFlashBookingRate from '../../../../hooks/useUpdateFlashBookingRate';

import AddRate from './Add';

function AddRateModal({
	showModal = false,
	setShowModal = () => {},
	filter = {},
	data = {},
	source = {},
	getStats = () => {},
	getListCoverage = () => {},
	shipment_data = {},
	requestData = [],
	feedbackData = [],
	shipment_loading = false,
	request_loading = false,
	feedback_loading = false,
	serviceIdPresent = {},
	setServiceIdPresent = () => {},
	spot_data = {},
	getData = () => {},
	triggeredFrom = '',
}) {
	const [chargeCodes, setChargeCodes] = useState(null);
	const [fclCfsChargeCodes, setFclCfsChargeCodes] = useState(null);
	const [activeTab, setActiveTab] = useState('main_freight');
	const [dependentMainFreight, setDependentMainFreight] = useState([{ service: 'main_freight' }]);
	const [payload, setPayload] = useState(null);

	const { user_data } = useSelector(({ profile }) => ({ user_data: profile || {} }));

	const addLocalServices = ['fcl_freight', 'air_freight']?.includes(filter?.service);

	const { user: { id: user_id = '' } = {} } = user_data;

	const showElements = {
		origin_main_port_id      : data?.origin_port?.is_icd,
		destination_main_port_id : data?.destination_port?.is_icd,
	};

	const { DEFAULT_VALUES, fields } = useControls({ data, user_id, filter, source, serviceIdPresent });

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm({ defaultValues: DEFAULT_VALUES });

	const values = watch();

	const { data:rateData } = useGetFreightRate({ filter, formValues: values, cardData: data });
	const { createRate, loading } = useCreateFreightRate(filter?.service);
	const { deleteRateJob } = useDeleteRateJob(filter?.service);
	const { deleteRequest } = useDeleteFreightRateRequests(filter?.service);
	const { deleteFeedbackRequest } = useDeleteFreightRateFeedbacks(filter?.service);
	const { updateFlashBookingRate } = useUpdateFlashBookingRate({ data, shipment_data, filter, source });

	const chargeCodesData = [
		rateData?.freight_charge_codes,
		rateData?.fcl_customs_charge_codes,
		rateData?.lcl_customs_charge_codes,
		rateData?.air_customs_charge_codes,
		rateData?.haulage_freight_charge_codes,
		rateData?.fcl_cfs_charge_codes,
	].find(Boolean);

	const { finalFields } = FieldMutation({
		fields,
		values,
		filter,
		chargeCodes,
		rateData,
		fclCfsChargeCodes,
	});

	const handleSuccessActions = () => {
		Toast.success('Rate added successfully');
		setShowModal(false);
		getStats();
		getListCoverage();
	};

	const handelAdditionalServices = async () => {
		Toast.success('Rate added successfully');
		setActiveTab('additional_freight');
		await getStats();
	};

	const handleSuccessOrAdditionalServices = () => {
		if (addLocalServices) {
			handelAdditionalServices();
		} else {
			handleSuccessActions();
		}
	};

	const handleSubmitData = async (formData) => {
		const rate_id = await createRate(formData, data, triggeredFrom);
		if (addLocalServices) {
			setPayload(formData);
		}
		if (rate_id && source === 'rate_feedback') {
			if (filter?.service === 'air_freight' || filter?.service === 'fcl_freight') {
				setPayload(formData);
			}
			const resp = await deleteFeedbackRequest({ id: data?.source_id, closing_remarks: data?.closing_remarks });
			if (resp === TWO_HUNDERD) {
				handleSuccessOrAdditionalServices();
			}
		}

		if (rate_id && source === 'rate_request') {
			const resp = await deleteRequest({ id: data?.source_id, closing_remarks: data?.closing_remarks });
			if (resp === TWO_HUNDERD) {
				handleSuccessOrAdditionalServices();
			}
		}

		if (rate_id && source === 'live_booking') {
			const resp = await updateFlashBookingRate({ formData, isManual: false });
			if (resp === TWO_HUNDERD) {
				handleSuccessOrAdditionalServices();
			}
		}
		if (['critical_ports', 'expiring_rates', 'cancelled_shipments']
			?.includes(source)) {
			if (rate_id) {
				const resp = await deleteRateJob({ rate_id, data: formData, id: data?.id });
				if (resp === TWO_HUNDERD) {
					handleSuccessOrAdditionalServices();
				}
			}
		}
	};

	const freeWeight = values?.free_weight;
	const weightSlabs = values?.weight_slabs;
	const weightSlabsJSON = JSON.stringify(weightSlabs);

	useEffect(() => {
		if (filter?.service_type === 'fcl_freight' || filter?.service_type === 'haulage') {
			weightSlabs.forEach((obj, index) => {
				if (index === DEFAULT_VALUE) {
					setValue('weight_slabs.0.lower_limit', Number(freeWeight) + DELTA_VALUE || DEFAULT_VALUE);
				} else {
					setValue(
						`weight_slabs.${index}.lower_limit`,
						Number(weightSlabs[index - VALUE_ONE].upper_limit) + DELTA_VALUE,
					);
				}
			});
		}
	}, [weightSlabsJSON, weightSlabs, freeWeight, setValue]);

	useEffect(() => {
		let prefillFreightCodes = [];
		if (rateData?.freight) {
			const { freight = {} } = rateData;
			const { validities = [] } = freight;
			if (!isEmpty(validities)) {
				const { line_items = [] } = validities[DEFAULT_VALUE];
				prefillFreightCodes = line_items;
				setValue('schedule_type', validities[DEFAULT_VALUE]?.schedule_type);
				setValue('validity_start', new Date(validities[DEFAULT_VALUE]?.validity_start));
				setValue('validity_end', new Date(validities[DEFAULT_VALUE]?.validity_end));
			}
		}

		let mandatoryFreightCodes = [];
		Object.keys(chargeCodesData || {}).forEach((code) => {
			if (chargeCodesData?.[code].tags?.includes('mandatory')) {
				let flag = {};
				prefillFreightCodes.forEach((charge) => {
					if (charge.code === code) {
						flag = charge;
					}
				});
				if (Object.keys(flag).length) {
					prefillFreightCodes = prefillFreightCodes.filter((item) => item.code !== flag.code);
					mandatoryFreightCodes = [...mandatoryFreightCodes,
						{ code, price: flag?.price, unit: flag?.unit, currency: flag?.currency }];
				} else {
					mandatoryFreightCodes = [...mandatoryFreightCodes,
						{ code, price: '', unit: '', currency: '' }];
				}
			}
		});

		if (mandatoryFreightCodes.length || prefillFreightCodes.length) {
			setValue('line_items', [...mandatoryFreightCodes, ...prefillFreightCodes]);
		}

		setValue('free_weight', rateData?.weight_limit?.free_limit);
	}, [JSON.stringify(rateData)]);

	useEffect(() => {
		if (chargeCodesData) {
			setChargeCodes(chargeCodesData);
		}
		if (rateData?.fcl_customs_cfs_charge_codes) {
			setFclCfsChargeCodes(rateData?.fcl_customs_cfs_charge_codes);
		}
	}, [rateData]);

	useEffect(() => {
		if (spot_data) {
			const TOTAL_SERVICES = [];
			const primary_service_id = spot_data?.primary_service_id;
			Object.keys(spot_data?.service_details || {})?.forEach((spot) => {
				if (
					spot !== primary_service_id
					&& spot_data?.service_details?.[spot]?.service_type === 'fcl_freight'
				) {
					TOTAL_SERVICES.push(spot_data?.service_details?.[spot]);
				}
			});
			setDependentMainFreight([...dependentMainFreight, ...TOTAL_SERVICES]);
		}
	}, [spot_data]);

	useEffect(() => {
		if (spot_data) 	{
			getData();
		}
	}, []);

	return (
		<AddRate
			showModal={showModal}
			setShowModal={setShowModal}
			setServiceIdPresent={setServiceIdPresent}
			getListCoverage={getListCoverage}
			activeTab={activeTab}
			source={source}
			shipment_data={shipment_data}
			requestData={requestData}
			feedbackData={feedbackData}
			shipment_loading={shipment_loading}
			request_loading={request_loading}
			feedback_loading={feedback_loading}
			addLocalServices={addLocalServices}
			showElements={showElements}
			setActiveTab={setActiveTab}
			finalFields={finalFields}
			control={control}
			handleSubmit={handleSubmit}
			loading={loading}
			errors={errors}
			handleSubmitData={handleSubmitData}
			payload={payload}
			data={data}
			spot_data={spot_data}
			dependentMainFreight={dependentMainFreight}
			filter={filter}
			getStats={getStats}
			triggeredFrom={triggeredFrom}
		/>
	);
}
export default AddRateModal;
