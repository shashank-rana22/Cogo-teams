/* eslint-disable no-param-reassign */
import { Button, Modal } from '@cogoport/components';
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
	openRateForm = false, setOpenRateForm = () => {}, rateValue = {}, mandatoryChargeCnt,
	cardData = {}, PortName = {}, portNameValue = {}, setRateValue = () => {}, backRequired = false,
}) {
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

	const [chargeCodes, setChargeCodes] = useState(null);

	const fieldControls = fclRateSpecificLocal({ data: rateValue, listShippingLineOptions });

	const { data: getChargeCode } = useGetFreightRate({ cardData, filter: { service: 'fcl_freight' } });
	const service = isEmpty(rateValue) ? 'fcl_freight_local' : 'fcl_freight';
	const { createRate = () => {} } = useCreateFreightRate({ service, PortName });

	const chargeCodesData = [getChargeCode?.origin_local_charge_codes, getChargeCode
		?.destination_local_charge_codes,
	].find(Boolean);

	const { control, errors, watch, handleSubmit, setValue } = useForm();
	const values = watch();

	const onSubmit = (val) => {
		const data = {
			...cardData, ...val,
		};
		createRate(data);
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
			const codeMapping = PortName === 'Origin'
				? getChargeCode?.origin_local_charge_codes : getChargeCode?.destination_local_charge_codes;

			const codeKeys = Object.keys(codeMapping || {});

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
				newControl.noDeleteButtonTill = mandatoryChargeCnt;
				return newChildCtrl;
			});
		}
		return { ...newControl };
	});

	return (
		<Modal size="md" show={openRateForm} onClose={() => setOpenRateForm(!openRateForm)} placement="top">
			<Header PortName={PortName} portNameValue={portNameValue} rateValue={rateValue} />
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
				>
					<IcMPlus />
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Controls;
