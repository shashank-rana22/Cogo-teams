import { useState, useEffect } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components';
import useForm from '@cogoport/front/hooks/useFormCogo';

const rawControls = ({ handleChange, charge, shipment_id }) => ({
	type: 'fieldArray',
	name: charge.id,
	subType: 'edit_service',
	service_name: charge.service_type,
	shipment_id,
	showHeader: true,
	showButtons: !['subsidiary_service'].includes(charge.service_type),
	showDeleteButton: true,
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
			label: `Truck Number ${charge.truck_number}`,
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
				{ label: 'Percentage of Freight', value: 'percentage_of_freight' },
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
	refetch,
	task,
	services,
	onCancel,
	timeLineRefetch,
	truckDetail = [],
	formattedRate,
	newServiceCharges = [],
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
		true,
		scope,
	)('/get_shipment_services_quotation', {
		params: {
			shipment_id: shipmentData.id,
			service_ids: requiredServiceIds,
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

	service_charges.forEach((initialService, initailIndex) => {
		newServiceCharges.forEach((newService) => {
			if (newService.service_id === initialService.service_id) {
				service_charges[initailIndex] = { ...initialService, ...newService };
			}
		});
	});

	const controlObj = service_charges.map((charge) => ({
		...rawControls({
			handleChange,
			charge,
			shipment_id: shipmentData.id,
			truck_number: (truckDetail || []).find(
				(serviceObj) => serviceObj.id === charge?.service_id,
			)?.truck_number,
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
				}));
			}
		});

		return allFormValues;
	};

	const newFormValues = prepareFormValues(selectedCodes, formValues);
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
					name: allChargeCodeHash?.[line_item.code]?.name,
					currency: line_item.currency,
					price: Number(line_item.price),
					quantity: Number(line_item.quantity),
					unit: line_item.unit,
				})),
			};

			properPayload.push(newQuote);
		});

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
	}, [service_charges.length, newServiceCharges.length]);

	return {
		onCreate,
		handleSubmit,
		controls: controlObj,
		loading: getServiceCharges.loading && settingValues,
		customValues,
		fields,
		shipmentData,
		confirmLoading: updateQuote.loading,
	};
};

export default useEditQuote;
