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
import useDeleteRateJob from '../../../../hooks/useDeleteRateJob';
import useGetFreightRate from '../../../../hooks/useGetFreightRate';

import useControls from './controls';
import styles from './styles.module.css';

function AddRateModal({
	showModal = true,
	setShowModal = () => {},
	filter = {},
	data = {},
	getStats = () => {},
	getListCoverage = () => {},
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

	const { data:rateData } = useGetFreightRate({ filter, formValues: values, cardData: data });

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
	const weightSlabsJSON = JSON.stringify(weightSlabs);

	useEffect(() => {
		if (filter?.service_type === 'fcl_freight' || filter?.service_type === 'haulage_freight') {
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
			<Modal.Header title="Please Add Rate" />
			<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
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
