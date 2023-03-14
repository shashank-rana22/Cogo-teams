import { useState, useEffect } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { startCase } from '@cogoport/front/utils';
import { toast } from '@cogoport/front/components';
import useForm from '@cogoport/front/hooks/useFormCogo';

const checkLineItemsSum = (properPayload) => {
	let check = true;
	const message = [];
	let lineItemCheck = false;
	let sumCheck = false;

	(properPayload || []).forEach((payload) => {
		let line_item_sum = 0;
		(payload?.line_items || []).forEach((line_item) => {
			const { price = 0, quantity = 0 } = line_item;
			line_item_sum += price * quantity;
		});

		if (payload?.line_items?.length === 0 && !lineItemCheck) {
			lineItemCheck = true;
			message.push('Atleast one line item should be present');
		}

		if (line_item_sum === 0 && !sumCheck) {
			sumCheck = true;
			message.push('Sum of line items should be > 0');
		}
		check = check && line_item_sum;
	});
	return { check, message };
};

const rawControls = ({ handleChange, charge, shipmentData }) => ({
	type: 'fieldArray',
	name: charge.id,
	subType: 'edit_service',
	service_name: charge.service_type,
	shipment_id: shipmentData.id,
	showHeader: true,
	showButtons: charge.service_type !== 'subsidiary_service',
	cargoDetails: charge?.service_detail?.[0],
	value: [
		{
			code: '',
			currency: '',
			price: '',
			quantity: '',
			unit: '',
			total: '',
		},
	],
	controls: [
		{
			label: startCase(`${charge?.trade_type || ''} - ${charge.service_type}`),
			type: 'select',
			name: 'code',
			span: 3,
			handleChange,
		},
		{
			label: 'Currency',
			name: 'currency',
			type: 'select',
			optionsListKey: 'currencies',
			span: 1,
		},
		{
			label: 'Rate',
			name: 'price',
			type: 'number',
			span: 2,
		},
		{
			label: 'Quantity',
			name: 'quantity',
			type: 'number',
			span: 1,
		},
		{
			label: 'Unit',
			type: 'select',
			name: 'unit',
			options: [
				{ label: 'Per container', value: 'per_container' },
				{ label: 'Per shipment', value: 'per_shipment' },
				{ label: 'Per BL', value: 'per_bl' },
				{ label: 'Per Kg', value: 'per_kg' },
				{ label: 'Per Truck', value: 'per_truck' },
				{ label: 'Per Awb', value: 'per_awb' },
				{ label: 'Per Cbm', value: 'per_cbm' },
				{ label: 'Per Kg Per Day', value: 'per_kg_per_day' },
			],
			span: 2,
		},
		{
			label: 'Amount',
			type: 'static',
			name: 'total',
			span: 2,
			render: (item) => <p>{item?.total}</p>,
		},
	],
});

const useEditQuote = ({
	shipmentData,
	refetch = () => {},
	task,
	services,
	onCancel,
	timeLineRefetch,
	formattedRate,
	setOpenCoload = () => {},
	refetchServices = () => {},
}) => {
	const { scope } = useSelector(({ general }) => ({ scope: general?.scope }));

	const [selectedCodes, setSelectedCodes] = useState({});
	const [settingValues, setSetttingValues] = useState(false);
	const [allChargeCodes, setAllChargeCodes] = useState({});

	const updateShipmentPendingTask = useRequest(
		'post',
		false,
		'partner',
	)('/update_shipment_pending_task');

	let notMainService = false;
	const requiredServiceIds = [];
	(services || []).forEach((serviceObj) => {
		if (
			[
				'fcl_freight_service',
				'fcl_freight_local_service',
				'fcl_cfs_service',
			].includes(serviceObj.service_type) &&
			shipmentData?.shipment_type === 'fcl_freight'
		) {
			notMainService = true;
			requiredServiceIds.push(serviceObj.id);
		} else if (
			serviceObj.service_type === `${shipmentData?.shipment_type}_service` ||
			serviceObj.service_type === `${shipmentData?.shipment_type}_local_service`
		) {
			notMainService = true;
			requiredServiceIds.push(serviceObj.id);
		}
	});

	(services || []).forEach((serviceObj) => {
		if (!notMainService) {
			requiredServiceIds.push(serviceObj.id);
		}
	});

	const getServiceCharges = useRequest(
		'get',
		!!shipmentData?.id,
		scope,
	)('/get_shipment_services_quotation', {
		params: {
			shipment_id: shipmentData.id,
			service_ids: requiredServiceIds,
			service_detail_required: true,
		},
	});

	const updateQuote = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_buy_quotations');

	const handleChange = (obj) => {
		if (!selectedCodes[obj.code]) {
			setSelectedCodes({ ...selectedCodes, [obj.code]: obj });
		}
	};
	const service_charges = getServiceCharges?.data?.service_charges || [];

	const trade_mapping = {
		import: 'Destination',
		export: 'Origin',
		undefined: '',
	};

	const service_charge_with_trade = (service_charges || []).map((charge) => {
		let chargeDetails = charge;
		(services || []).forEach((serviceObj) => {
			if (charge?.service_id === serviceObj?.id) {
				chargeDetails = {
					...charge,
					trade_type: trade_mapping[serviceObj?.trade_type],
				};
			}
		});
		return chargeDetails;
	});

	const controlObj = service_charge_with_trade.map((charge) => ({
		...rawControls({
			handleChange,
			charge,
			shipmentData,
		}),
		onOptionsChange: (vals) =>
			setAllChargeCodes({ ...allChargeCodes, ...vals }),
	}));

	const allChargeCodeHash = {};
	Object.keys(allChargeCodes || {}).forEach((key) => {
		const charges = allChargeCodes[key];
		(charges || []).forEach((charge) => {
			allChargeCodeHash[charge.code] = charge;
		});
	});

	const { fields, watch, handleSubmit, setValues } = useForm(controlObj);

	const formValues = watch();

	const labels = {};

	const customValues = {};

	const prepareFormValues = () => {
		const allFormValues = { ...formValues };
		(Object.keys(formValues) || []).forEach((key) => {
			if (key && formValues[key]) {
				allFormValues[key] = (allFormValues[key] || []).map((value) => ({
					...value,
					total: (value.price || 0) * (value.quantity || 0),
					name: Object.keys(selectedCodes || {}).includes(value?.code)
						? selectedCodes?.[value?.code]?.name
						: value.name,
				}));
			}
		});

		return allFormValues;
	};

	const newFormValues = prepareFormValues();

	Object.keys(fields).forEach((key) => {
		customValues[key] = {
			formValues: newFormValues[key],
			label: labels[key],
			id: key,
		};
	});

	const onCreate = async (values) => {
		const properPayload = [];

		Object.keys(values).forEach((key) => {
			const items = values[key];

			const newQuote = {
				id: key,
				service_id: (service_charges || []).find((charge) => charge?.id === key)
					?.service_id,
				line_items: items.map((line_item) => ({
					code: line_item.code,
					name:
						allChargeCodeHash?.[line_item.code]?.name ||
						selectedCodes?.[line_item.code]?.name,
					currency: line_item.currency,
					price: Number(line_item.price),
					quantity: Number(line_item.quantity),
					unit: line_item.unit,
				})),
			};

			properPayload.push(newQuote);
		});

		const checkSum = checkLineItemsSum(properPayload);

		if (!checkSum.check) {
			toast.error(checkSum.message.join(','));
			return;
		}

		try {
			const res = await updateQuote.trigger({
				data: {
					quotations: properPayload,
				},
			});

			if (!res.hasError) {
				const updationResponse = await updateShipmentPendingTask.trigger({
					data: {
						id: task.id,
					},
				});
				if (!updationResponse.hasError) {
					refetch();
					onCancel();
					toast.success('Line Items updated successfully!');
					timeLineRefetch();
					refetchServices();
					setOpenCoload(false);
				}
			}
		} catch (err) {
			toast.error(JSON.stringify(err?.data));
		}
	};

	useEffect(() => {
		if (service_charges.length) {
			setSetttingValues(true);
			const newValues = {};
			service_charges.forEach((charge) => {
				const line_items =
					formattedRate?.[charge.service_id]?.line_items ||
					charge.line_items ||
					[];
				newValues[charge.id] = line_items.map((item) => ({
					code: item.code,
					currency: item.currency,
					price: item.price,
					quantity: item.quantity,
					unit: item.unit,
					total: item.price * item.quantity,
				}));
			});
			setValues(newValues);
			setSetttingValues(false);
		}
	}, [service_charges.length, formattedRate?.id]);

	return {
		onCreate,
		handleSubmit,
		controls: controlObj,
		loading: getServiceCharges.loading && settingValues,
		customValues,
		fields,
		shipmentData,
		confirmLoading: updateQuote.loading || updateShipmentPendingTask.loading,
	};
};

export default useEditQuote;
