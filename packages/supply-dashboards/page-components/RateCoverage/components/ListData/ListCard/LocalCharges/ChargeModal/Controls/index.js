/* eslint-disable no-param-reassign */
import { Button, Modal, Toast } from '@cogoport/components';
import {
	useForm, useGetAsyncOptions,
	asyncFieldsListOperators,
} from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty, merge, startCase } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import Layout from '../../../../../../../RfqEnquiries/Layout';
import fclRateSpecificLocal from '../../../../../../configurations/controls/add-fcl-rate-specific-local';
import useCreateFreightRate from '../../../../../../hooks/useCreateFreightRate';
import useGetFreightRate from '../../../../../../hooks/useGetFreightRate';
import Header from '../Headers';

function Controls({
	openRateForm = false, setOpenRateForm = () => {}, rateValue = {}, cardData = {}, PortName = {},
	portNameValue = {}, setRateValue = () => {}, backRequired = false,
	getExportData = () => {},
	getImportData = () => {},
	IMPORT_DATA = '', EXPORT_DATA = '',
	values: formValues = {},
	setStoreLocalImportData = () => {},
	isChecked = {},
	setStoreLocalExportData = () => {},
}) {
	const [chargeCodes, setChargeCodes] = useState(null);

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

	const fieldControls = fclRateSpecificLocal({ data: rateValue, cardData, listShippingLineOptions });

	const { data: getChargeCode } = useGetFreightRate({ cardData, PortName, filter: { service: 'fcl_freight_local' } });

	const { createRate = () => {}, loading = false } = useCreateFreightRate({
		service: 'fcl_freight_local',
		PortName,
		formValues,
	});

	const chargeCodesData = [getChargeCode?.local_charge_codes].find(Boolean);

	const { control, formState: { errors }, watch, handleSubmit, setValue } = useForm();
	const values = watch();

	const onSubmit = async (val) => {
		const data = {
			...cardData, ...val,
		};

		if (isEmpty(isChecked)) {
			const resp = await createRate(data);
			const Origin_id = cardData?.origin_port_id;
			const destination_id = cardData?.destination_port_id;
			if (!isEmpty(resp)) {
				setOpenRateForm(!openRateForm);
				getImportData(IMPORT_DATA, destination_id);
				getExportData(EXPORT_DATA, Origin_id);
			}
		}
		if (PortName === 'Origin') {
			setStoreLocalImportData(val);
			Toast.success('Added Succesfully');
			setOpenRateForm(!openRateForm);
		}
		if (PortName === 'Destination') {
			setStoreLocalExportData(val);
			Toast.success('Added Succesfully');
			setOpenRateForm(!openRateForm);
		}
	};

	const handelClose = () => {
		setRateValue('');
		setOpenRateForm(!openRateForm);
	};

	useEffect(() => {
		let prefillFreightCodes = [];
		const { line_items = [] } = rateValue;
		prefillFreightCodes = line_items;

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
	}, [chargeCodesData, rateValue, setValue]);

	useEffect(() => {
		if (chargeCodesData) {
			setChargeCodes(chargeCodesData);
		}
	}, [chargeCodesData]);

	const finalFields = (fieldControls || []).map((fields) => {
		const { name, type } = fields;
		const newControl = { ...fields };
		if (type === 'fieldArray' && name.includes('line_items')) {
			const codeMapping = getChargeCode?.local_charge_codes;

			const codeKeys = Object.keys(codeMapping || {});
			let count = 0;
			Object.keys(chargeCodesData || {}).forEach((code) => {
				if (chargeCodesData?.[code].tags?.includes('mandatory')) {
					count += 1;
				}
			});

			newControl.noDeleteButtonTill = count;

			newControl.controls = newControl.controls.map((childCtrl) => {
				const newChildCtrl = { ...childCtrl };
				if (childCtrl.name === 'unit') {
					const UNIT_OPTIONS = {};
					const chargeValues = values[fields.name];

					chargeValues?.forEach((item, i) => {
						UNIT_OPTIONS[i] = (
							chargeCodes?.[item.code]?.units
							|| ['per_container']
						).map((unit) => ({
							label : startCase(unit),
							value : unit,
						}));
					});
					newChildCtrl.customProps = { options: UNIT_OPTIONS };
				}
				if (childCtrl.name === 'code') {
					newChildCtrl.options = (codeKeys).map((code) => (
						{ label: codeMapping[code]?.name, value: code }));
				}

				return newChildCtrl;
			});
		}
		return { ...newControl };
	});

	return (
		<Modal size="md" show={openRateForm} onClose={() => setOpenRateForm(!openRateForm)} placement="top">
			<Header PortName={PortName} portNameValue={portNameValue} />
			<Modal.Body>
				<Layout
					fields={finalFields}
					control={control}
					errors={errors}
				/>

			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					onClick={handelClose}
				>
					{backRequired ? 'Back' : 'Close'}
				</Button>
				<Button
					size="md"
					onClick={handleSubmit(onSubmit)}
					style={{ marginLeft: '10px' }}
					disabled={loading}
				>
					<IcMPlus />
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Controls;
