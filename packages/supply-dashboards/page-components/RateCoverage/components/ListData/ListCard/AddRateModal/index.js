/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Toast } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import Layout from '../../../../../RfqEnquiries/Layout';
import { DEFAULT_VALUE, DELTA_VALUE, VALUE_ONE } from '../../../../configurations/helpers/constants';
import FieldMutation from '../../../../configurations/helpers/mutation-fields';
import useCreateFreightRate from '../../../../hooks/useCreateFreightRate';
import useDeleteFreightRateFeedbacks from '../../../../hooks/useDeleteFreightRateFeedbacks';
import useDeleteFreightRateRequests from '../../../../hooks/useDeleteFreightRateRequests';
import useDeleteRateJob from '../../../../hooks/useDeleteRateJob';
import useGetFreightRate from '../../../../hooks/useGetFreightRate';
import useUpdateFlashBookingRate from '../../../../hooks/useUpdateFlashBookingRate';
import ServiceDetailsContent from '../DetailsView/Content';

import useControls from './controls';
import styles from './styles.module.css';

const ZERO_VALUE = 0;
const TWO_HUNDERD = 200;
function AddRateModal({
	showModal = true,
	setShowModal = () => {},
	filter = {},
	data = {},
	source = {},
	getStats = () => {},
	getListCoverage = () => {},
	shipmemnt_data = {},
	requestData,
	feedbackData,
	shipment_loading = false,
	request_loading = false,
	feedback_loading = false,
}) {
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const [chargeCodes, setChargeCodes] = useState(null);

	const { user: { id: user_id = '' } = {} } = user_data;

	const showElements = {
		origin_main_port_id      : data?.origin_port?.is_icd,
		destination_main_port_id : data?.destination_port?.is_icd,
	};

	const { DEFAULT_VALUES, fields } = useControls({ data, user_id, filter });

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm({ defaultValues: DEFAULT_VALUES });

	const values = watch();

	const { data:rateData } = useGetFreightRate({ filter, formValues: values, cardData: data, values });

	const { finalFields } = FieldMutation({
		fields,
		values,
		rateData,
		filter,
		chargeCodes,
		setChargeCodes,
	});

	const { createRate } = useCreateFreightRate(filter?.service);
	const { deleteRateJob } = useDeleteRateJob(filter?.service);
	const { deleteRequest } = useDeleteFreightRateRequests(filter?.service);
	const { deleteFeedbackRequest } = useDeleteFreightRateFeedbacks(filter?.service);
	const { updateFlashBookingRate } = useUpdateFlashBookingRate();

	const handleSuccessActions = () => {
		Toast.success('Rate added successfully');
		setShowModal(false);
		getStats();
		getListCoverage();
	};

	const handleSubmitData = async (formData) => {
		const rate_id = await createRate(formData);
		if (source === 'rate_feedback') {
			const resp = await deleteFeedbackRequest({ id: data?.source_id, closing_remarks: data?.closing_remarks });
			if (resp === TWO_HUNDERD) {
				handleSuccessActions();
			}
		}
		if (source === 'rate_request') {
			const resp = await deleteRequest({ id: data?.source_id, closing_remarks: data?.closing_remarks });
			if (resp === TWO_HUNDERD) {
				handleSuccessActions();
			}
		}
		if (source === 'live_bookings') {
			const resp = await updateFlashBookingRate({ data });
			if (resp === TWO_HUNDERD) {
				handleSuccessActions();
			}
		}
		if (['critical_ports', 'expiring_rates', 'cancelled_shipments']
			?.includes(source)) {
			const resp = await deleteRateJob({ rate_id, data: formData, id: data?.id });
			if (!resp?.error) {
				handleSuccessActions();
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
		Object.keys(rateData?.freight_charge_codes || {}).forEach((code) => {
			if (rateData?.freight_charge_codes?.[code].tags?.includes('mandatory')) {
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
		if (rateData?.freight_charge_codes) {
			setChargeCodes(rateData?.freight_charge_codes);
		}
	}, [JSON.stringify(rateData?.freight_charge_codes)]);

	return (
		<Modal show={showModal} onClose={() => { setShowModal((prev) => !prev); }} placement="top" size="xl">
			<Modal.Header title={(
				<div>
					{['live_bookings', 'rate_feedback', 'rate_request']?.includes(source)
			&& (
				<div className={styles.service_content}>
					<ServiceDetailsContent
						shipmemnt_data={shipmemnt_data}
						data={data}
						requestData={requestData?.list?.[ZERO_VALUE] || null}
						feedbackData={feedbackData?.list?.[ZERO_VALUE] || null}
						shipment_loading={shipment_loading}
						request_loading={request_loading}
						feedback_loading={feedback_loading}
					/>
				</div>
			)}
				</div>
			)}
			/>

			<Modal.Body>
				<div className={styles.title}>Please Add Rate</div>
				<Layout
					fields={finalFields}
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
