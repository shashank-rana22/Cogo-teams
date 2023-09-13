/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable custom-eslint/variables-name-check */
import { Button, Modal, Toast } from '@cogoport/components';
import {
	asyncFieldsListOperators,
	asyncFieldsLocations,
	asyncFieldsPartnerUsersIds,
	useForm,
	useGetAsyncOptions,
} from '@cogoport/forms';
import { FREIGHT_CONTAINER_COMMODITY_MAPPINGS } from '@cogoport/globalization/constants/commodities';
import { useSelector } from '@cogoport/store';
import { isEmpty, merge, startCase } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import Layout from '../../../../../RfqEnquiries/Layout';
import { DEFAULT_VALUE, DELTA_VALUE, FIVE_HUNDRED, VALUE_ONE } from '../../../../configurations/helpers/constants';
import FieldMutation from '../../../../configurations/helpers/mutation-fields';
import useCreateFreightRate from '../../../../hooks/useCreateFreightRate';
import useDeleteRateJob from '../../../../hooks/useDeleteRateJob';
import useGetFreightRate from '../../../../hooks/useGetFreightRate';

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

const getDefaultValues = (oldfields) => {
	const DEFAULT_VALUES = {};
	const newfields = oldfields.map((field) => {
		const { value, ...rest } = field;
		if (field.type === 'fieldArray') {
			DEFAULT_VALUES[field.name] = value || [];
		} else {
			DEFAULT_VALUES[field.name] = value || '';
		}
		return rest;
	});
	return { DEFAULT_VALUES, fields: newfields };
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
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const [chargeCodes, setChargeCodes] = useState(null);

	const { user: { id: user_id = '' } = {} } = user_data;

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

	const fclCommodityOptions = getCommodityOptions(data?.container_type);

	const finalControls = !isAirService ? fclControls({
		data,
		listShippingLineOptions,
		originLocationOptions,
		destinationLocationOptions,
		fclCommodityOptions,
	}) : airControls({
		data,
		listPartnerUserOptions,
		user_id,
		originLocationOptions,
		destinationLocationOptions,
		listAirLineOptions,
	});

	const { DEFAULT_VALUES, fields } = getDefaultValues(finalControls);

	const showElements = {
		origin_main_port_id      : data?.origin_port?.is_icd,
		destination_main_port_id : data?.destination_port?.is_icd,
	};

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
	}, [weightSlabsJSON, weightSlabs, isAirService, freeWeight, setValue]);

	useEffect(() => {
		let prefillFreightCodes = [];
		if (rateData?.freight) {
			const { freight = {} } = rateData;
			const { validities = [] } = freight;
			if (!isEmpty(validities)) {
				const { line_items = [] } = validities[DEFAULT_VALUE];
				prefillFreightCodes = line_items;
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
