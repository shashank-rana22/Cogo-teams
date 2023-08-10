import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

import { rawControls } from '../configs/rawControls';
import { generateDefaultValues, prepareFormValues } from '../utils/helperFunctions';

const setValues = ({ valuesObj, setValue }) => {
	Object.entries(valuesObj || {}).forEach(([key, value]) => {
		setValue(key, value);
	});
};

const useEditQuote = ({
	shipmentData = {},
	refetch = () => {},
	task = {},
	services = [],
	onCancel = () => {},
	timeLineRefetch = () => {},
	truckDetail = [],
	formattedRate = {},
	newServiceCharges = [],
	serviceProviderData = {},
}) => {
	const [selectedCodes, setSelectedCodes] = useState({});
	const [allChargeCodes, setAllChargeCodes] = useState({});

	const requiredServiceIds = services.reduce((acc, serviceObj) => {
		if (serviceObj?.service_type === 'ftl_freight_service') {
			acc.push(serviceObj?.id);
		}
		return acc;
	}, []);

	const [{ data: serviceChargesData, loading: chargeLoading }, quotationTrigger] = useRequest({
		url    : '/get_shipment_services_quotation',
		method : 'GET',
		params : {
			shipment_id : shipmentData.id,
			service_ids : requiredServiceIds,
		},
	}, { manual: true });

	const [{ loading: taskLoading }, taskTrigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const [{ loading: quoteLoading }, trigger] = useRequest({
		url    : '/update_shipment_buy_quotations',
		method : 'POST',
	}, { manual: true });

	const service_charges =	JSON.parse(
		JSON.stringify(serviceChargesData?.service_charges || []),
	) || [];
	service_charges.forEach((initialService, initailIndex) => {
		newServiceCharges.forEach((newService) => {
			if (newService.service_id === initialService.service_id) {
				service_charges[initailIndex] = { ...initialService, ...newService };
			}
		});
	});

	const handleChange = (obj) => {
		if (!selectedCodes[obj.code]) {
			setSelectedCodes({ ...selectedCodes, [obj.code]: obj });
		}
	};

	const handleOptionsChange = useCallback(
		(vals) => {
			setAllChargeCodes((prevChargeCodes) => ({ ...prevChargeCodes, ...vals }));
		},
		[setAllChargeCodes],
	);

	const controls = service_charges.map((charge) => ({
		...rawControls({
			handleChange,
			charge,
			shipment_id  : shipmentData.id,
			truck_number : (truckDetail || []).find(
				(serviceObj) => serviceObj.id === charge?.service_id,
			)?.truck_number,
		}),
		onOptionsChange: handleOptionsChange,
	}));

	const allChargeCodeHash = Object.values(allChargeCodes || {}).reduce((acc, charges) => {
		(charges || []).forEach((charge) => {
			acc[charge.code] = charge;
		});
		return acc;
	}, {});

	const defaultValues = generateDefaultValues({ values: controls });

	const { control, watch, handleSubmit, formState: { errors }, setValue } = useForm({ defaultValues });

	const formValues = watch();
	const newFormValues = prepareFormValues(formValues);

	const customValues = controls.reduce((acc, ctrl) => {
		acc[ctrl?.name] = {
			formValues : newFormValues[ctrl.name],
			id         : ctrl?.name,
		};
		return acc;
	}, {});

	const onCreate = async (finalValues) => {
		const payload = Object.keys(finalValues).map((key) => {
			const serviceId = (service_charges || []).find(
				(charge) => charge?.id === key,
			)?.service_id;

			const serviceObj = newServiceCharges.find(
				(item) => serviceId === item.service_id,
			);

			const serviceProviderObject = serviceProviderData[
				serviceObj.truck_type
			]?.find(
				(item) => item?.service_provider_id === serviceObj?.service_provider_id,
			);

			const advanced_amount =	serviceProviderObject?.updated_advance_amount
				|| serviceProviderObject?.advanced_amount;
			const advanced_amount_currency = serviceProviderObject?.advanced_amount_currency;

			const split_advanced_amount = serviceProviderObject?.split_advanced_amount || undefined;

			const items = finalValues[key];

			return {
				id         : key,
				service_id : (service_charges || []).find((charge) => charge?.id === key)
					?.service_id,
				line_items: items.map((line_item) => ({
					code     : line_item.code,
					name     : allChargeCodeHash?.[line_item.code]?.name,
					currency : line_item.currency,
					price    : Number(line_item.price),
					quantity : Number(line_item.quantity),
					unit     : line_item.unit,
				})),
				advance_amount          : advanced_amount,
				advance_amount_currency : advanced_amount_currency,
				split_advance_amount    : split_advanced_amount,
				advance_amount_status   : 'pending',
			};
		});

		try {
			await trigger({
				data: {
					quotations: payload,
				},
			});

			await taskTrigger({
				data: {
					id: task?.id,
				},
			});

			Toast.success('Line Items updated successfully!');
			refetch();
			onCancel();
			timeLineRefetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	const getServiceCharges = useCallback(async () => {
		try {
			await quotationTrigger();
		} catch (error) {
			toastApiError(error);
		}
	}, [quotationTrigger]);

	useEffect(() => {
		getServiceCharges();
	}, [getServiceCharges]);

	useEffect(() => {
		if (!isEmpty(service_charges)) {
			const newValues = service_charges.reduce((acc, charge) => {
				const line_items = formattedRate?.[charge.service_id]?.line_items
					|| charge.line_items
					|| [];
				acc[charge.id] = line_items.map((item) => ({
					code     : item.code,
					currency : item.currency,
					price    : item.price,
					quantity : item.quantity,
					unit     : item.unit,
					total    : item.price * item.quantity,
				}));
				return acc;
			}, {});
			setValues({ valuesObj: newValues, setValue });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [service_charges.length, newServiceCharges.length]);

	return {
		control,
		handleSubmit,
		errors,
		customValues,
		onCreate,
		controls,
		loading: quoteLoading || taskLoading || chargeLoading,
	};
};

export default useEditQuote;
