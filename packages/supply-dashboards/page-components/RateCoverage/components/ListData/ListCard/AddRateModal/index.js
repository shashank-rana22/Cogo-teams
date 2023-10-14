/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import { Button, Modal, Toast, Tabs, TabPanel } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import Layout from '../../../../../RfqEnquiries/Layout';
import useControls from '../../../../configurations/controls';
import { DEFAULT_VALUE, DELTA_VALUE, TWO_HUNDERD, VALUE_ONE } from '../../../../configurations/helpers/constants';
import FieldMutation from '../../../../configurations/helpers/mutation-fields';
import useCreateFreightRate from '../../../../hooks/useCreateFreightRate';
import useDeleteFreightRateFeedbacks from '../../../../hooks/useDeleteFreightRateFeedbacks';
import useDeleteFreightRateRequests from '../../../../hooks/useDeleteFreightRateRequests';
import useDeleteRateJob from '../../../../hooks/useDeleteRateJob';
import useGetFreightRate from '../../../../hooks/useGetFreightRate';
import useGetSpoetSearches from '../../../../hooks/useGetSpoetSearches';
import useUpdateFlashBookingRate from '../../../../hooks/useUpdateFlashBookingRate';
import AddAdditionalRates from '../AddRate/AddAdditionalRate';
import ServiceDetailsContent from '../DetailsView/Content';

import styles from './styles.module.css';

function AddRateModal({
	showModal = true,
	setShowModal = () => {},
	filter = {},
	data = {},
	source = {},
	getStats = () => {},
	getListCoverage = () => {},
	shipmemnt_data = {},
	requestData = [],
	feedbackData = [],
	shipment_loading = false,
	request_loading = false,
	feedback_loading = false,
}) {
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const [chargeCodes, setChargeCodes] = useState(null);
	const [activeTab, setActiveTab] = useState('main_freight');
	const [dependentMainFreight, setDependentMainFreight] = useState([
		{ service: 'main_freight' },
	]);

	const [payload, setPayload] = useState({});

	const { user: { id: user_id = '' } = {} } = user_data;

	const showElements = {
		origin_main_port_id      : data?.origin_port?.is_icd,
		destination_main_port_id : data?.destination_port?.is_icd,
	};

	const { DEFAULT_VALUES, fields } = useControls({ data, user_id, filter, source });

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm({ defaultValues: DEFAULT_VALUES });

	const values = watch();

	const { data:rateData } = useGetFreightRate({ filter, formValues: values, cardData: data });
	const { spot_data, getData } = useGetSpoetSearches({ id: data?.source_id });

	const { finalFields } = FieldMutation({
		fields,
		values,
		filter,
		chargeCodes,
		rateData,
	});

	const { createRate, loading } = useCreateFreightRate(filter?.service);
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
		setPayload(formData);
		if (rate_id && source === 'rate_feedback') {
			const resp = await deleteFeedbackRequest({ id: data?.source_id, closing_remarks: data?.closing_remarks });
			if (resp === TWO_HUNDERD) {
				handleSuccessActions();
			}
		}
		if (rate_id && source === 'rate_request') {
			const resp = await deleteRequest({ id: data?.source_id, closing_remarks: data?.closing_remarks });
			if (resp === TWO_HUNDERD) {
				handleSuccessActions();
			}
		}
		if (rate_id && source === 'live_booking') {
			const resp = await updateFlashBookingRate({ data, formData, shipmemnt_data });
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

	useEffect(() => {
		if (spot_data) {
			const TOTAL_SERVICES = [];
			const primary_service_id = spot_data?.primary_service_id;
			Object.keys(spot_data?.service_details).forEach((spot) => {
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
		if (data?.source_id) {
			getData();
		}
	}, []);

	return (
		<Modal show={showModal} onClose={() => { setShowModal((prev) => !prev); }} placement="top" size="xl">
			<div>
				{['live_booking', 'rate_feedback', 'rate_request']?.includes(source)
			&& (
				<div className={styles.service_content}>
					<ServiceDetailsContent
						shipmemnt_data={shipmemnt_data}
						requestData={requestData?.list?.[DEFAULT_VALUE] || null}
						feedbackData={feedbackData?.list?.[DEFAULT_VALUE] || null}
						shipment_loading={shipment_loading}
						request_loading={request_loading}
						feedback_loading={feedback_loading}
					/>
				</div>
			)}
			</div>

			<Tabs
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
				style={{ marginLeft: '10px' }}
			>
				<TabPanel name="main_freight" title="ADD MAIN FREIGHT RATE">
					<Modal.Body>
						<div className={styles.title}>Please Add Rate</div>
						<Layout
							fields={finalFields}
							control={control}
							errors={errors}
							showElements={showElements}
							source={source}
						/>
					</Modal.Body>
					<Modal.Footer>
						<div className={styles.submit_button}>
							<Button
								size="md"
								onClick={() => setShowModal((prev) => !prev)}
								style={{ marginRight: '20px' }}
								themeType="secondary"
							>
								Close
							</Button>
							<Button
								size="md"
								onClick={handleSubmit(handleSubmitData)}
								disabled={loading}
							>
								Submit
							</Button>
						</div>
					</Modal.Footer>
				</TabPanel>

				{['fcl_freight', 'air_freight'].includes(filter?.service) && (
					<TabPanel name="additional_freight" title="ADD OTHER SERVICES RATES">
						<AddAdditionalRates
							payload={payload}
							showAddRate={data}
							additionalService={spot_data?.service_details}
							dependentMainFreight={dependentMainFreight}
						/>
					</TabPanel>
				)}
			</Tabs>

		</Modal>
	);
}
export default AddRateModal;
