import { useState, useEffect } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import { useFormCogo } from '@cogoport/front/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components';
import { startCase } from '@cogoport/front/utils';

const controls = [
	{
		name: 'freight_declaration',
		type: 'fieldArray',
		label: 'Freight Declaration',
		showButtons: false,
		showDeleteButton: false,
		value: [],
		controls: [
			{
				name: 'commodity',
				label: 'Commodity',
				type: 'text',
				disabled: true,
				span: 4,
				rules: { required: 'Required' },
			},
			{
				name: 'currency',
				label: 'Currency',
				type: 'select',
				showOptional: false,
				optionsListKey: 'currencies',
				placeholder: 'Select Currency',
				rules: { required: { value: true, message: 'Currency required' } },
				span: 2,
			},
			{
				name: 'freight_price',
				label: 'Freight Rate',
				type: 'number',
				showOptional: false,
				placeholder: 'Enter rate',
				rules: {
					required: { value: true, message: 'Freight rate required' },
					validate: (value) =>
						value < 0 ? 'Freight rate cannot be negative' : true,
				},
				span: 2.5,
			},
			{
				name: 'origin_price',
				label: 'Exwork',
				type: 'number',
				showOptional: false,
				placeholder: 'Enter rate',
				rules: {
					required: { value: true, message: 'Exwork required' },
					validate: (value) => (value < 0 ? 'Exwork cannot be negative' : true),
				},
				span: 1.5,
			},
			{
				name: 'total_charge',
				label: 'Total',
				disabled: true,
				span: 2,
				rules: { required: 'Required' },
			},
		],
	},
];

const getFclFreightUpdateData = ({
	values,
	commodityValues,
	containersData,
	id,
	rate,
}) => {
	const rateData = values?.freight_declaration;
	const hazardousContainers = [];
	const nonHazardousContainers = [];
	const nonHazQuotations = [];
	const hazQuotations = [];

	containersData.forEach((item) => {
		const { container_number, container_size, container_type } = item || {};

		const container_data = `${container_number}/${container_size}`;
		if (
			commodityValues[`is_hazardous-${item?.serial_no}`] ===
			`hazardous-${container_size}-${container_type}`
		) {
			hazardousContainers.push(container_data);
		} else {
			nonHazardousContainers.push(container_data);
		}
	});

	rateData?.forEach((data) => {
		const containerDetails = data?.item.split('-');

		if (Number(data?.freight_price)) {
			const quotation = {
				freight_price: Number(data?.freight_price),
				origin_price: Number(data?.origin_price),
				currency: data?.currency,
				unit: rate?.freight_charges?.unit,
				container_size: containerDetails?.[1],
				container_type: containerDetails?.[2],
			};
			if (containerDetails?.[0] === 'hazardous') {
				hazQuotations.push(quotation);
			} else {
				nonHazQuotations.push(quotation);
			}
		}
	});

	return {
		update_data: {
			haz_container_nos: hazardousContainers,
			non_haz_container_nos: nonHazardousContainers,
			haz_quotation: hazQuotations,
			non_haz_quotation: nonHazQuotations,
		},
		shipment_id: id,
	};
};

const useCommodityUpdate = ({
	task,
	rate = {},
	containersData = [],
	commodityValues = {},
	shipmentData = {},
	setUpdateFreightCertificate = () => {},
	primary_service = {},
	onCancel = () => {},
	refetch = () => {},
	timeLineRefetch = () => {},
}) => {
	const {
		query: { id },
		scope,
	} = useSelector(({ general }) => ({
		query: (general || {}).query || {},
		scope: general.scope,
	}));

	const [error, setError] = useState();

	const shipmentType = shipmentData.shipment_type;

	const isHazardous = primary_service?.is_hazardous;

	const commodityTypes =
		shipmentType === 'fcl_freight'
			? [...new Set(Object.values(commodityValues))]
			: ['hazardous', 'non-hazardous'];

	const { fields, handleSubmit, setValue, watch } = useFormCogo(controls);

	useEffect(() => {
		const freightDeclaration = [];

		commodityTypes.forEach((type) => {
			const isHazardousCondition =
				(isHazardous && type === 'hazardous') ||
				(!isHazardous && type === 'non-hazardous') ||
				shipmentType === 'fcl_freight';

			const rateObject = {
				item: type,
				commodity: startCase(type),
				currency: isHazardousCondition ? rate?.freight_charges?.currency : '',
				freight_price: isHazardousCondition ? rate?.freight_charges?.price : 0,
				origin_price: isHazardousCondition ? rate?.other_charges?.price : 0,
				total_charge: isHazardousCondition ? rate?.total_charge || 0 : 0,
			};
			freightDeclaration.push(rateObject);
		});
		setValue('freight_declaration', freightDeclaration);
	}, [JSON.stringify(commodityTypes)]);

	const formValues = watch();

	const getTotalCustomLabels = () => {
		const customLabels = {};
		controls?.forEach((control) => {
			if (control?.name === 'freight_declaration') {
				customLabels[control.name] = (
					formValues?.freight_declaration || []
				).map((item) => ({
					total_charge: `Total : 
						${(Number(item?.freight_price) || 0) + (Number(item?.origin_price) || 0)}`,
					freight_price: `Rate per ${
						rate?.freight_charges?.unit || 'container'
					}`,
				}));
			}
		});
		return customLabels;
	};

	const customLabels = getTotalCustomLabels();

	const { loading, trigger } = useRequest(
		'post',
		false,
		scope,
	)('generate_freight_certificate');

	const updateShipmentPendingTask = useRequest(
		'post',
		false,
		'partner',
	)('/update_shipment_pending_task');

	const onError = (err) => {
		setError(err);
	};

	const onCreate = async (values) => {
		let data = {};

		if (shipmentType === 'fcl_freight') {
			data = getFclFreightUpdateData({
				values,
				commodityValues,
				containersData,
				id,
				rate,
			});
		} else {
			const hazRates = values?.freight_declaration?.find(
				(ele) => ele?.item === 'hazardous',
			);
			const nonHazRates = values?.freight_declaration?.find(
				(ele) => ele?.item === 'non-hazardous',
			);

			const quotation = {};
			quotation.hazQuotation = [
				{
					freight_price: Number(hazRates?.freight_price),
					origin_price: Number(hazRates?.origin_price),
					currency: hazRates?.currency,
					unit: rate?.freight_charges?.unit,
				},
			];
			quotation.nonHazQuotation = [
				{
					freight_price: Number(nonHazRates?.freight_price),
					origin_price: Number(nonHazRates?.origin_price),
					currency: nonHazRates?.currency,
					unit: rate?.freight_charges?.unit,
				},
			];

			if (
				quotation.hazQuotation[0]?.freight_price &&
				quotation.nonHazQuotation[0]?.freight_price
			) {
				data = {
					update_data: {
						haz_quotation: quotation.hazQuotation,
						non_haz_quotation: quotation.nonHazQuotation,
					},
					shipment_id: id,
				};
			} else if (quotation.nonHazQuotation[0]?.freight_price) {
				data = {
					update_data: {
						non_haz_quotation: quotation.nonHazQuotation,
					},
					shipment_id: id,
				};
			} else if (quotation.hazQuotation[0]?.freight_price) {
				data = {
					update_data: {
						haz_quotation: quotation.hazQuotation,
					},
					shipment_id: id,
				};
			}
		}

		if (Object.keys(data).length === 0) {
			toast.error('Please add valid rates!');
			return;
		}

		try {
			const res = await trigger({ params: data });
			if (!res.hasError) {
				if (task?.task) {
					toast.success('Freight Certificate Generated!');
					UpdateTask();
				} else {
					toast.success('Freight Certificate Updated!');
					setUpdateFreightCertificate(false);
					refetch();
				}
			}
		} catch (err) {
			toast.error(err.data);
		}
	};

	const UpdateTask = async () => {
		const payload = {
			id: task?.id,
			data: {
				shipment: {
					id: shipmentData.id,
				},
			},
		};

		try {
			const res = await updateShipmentPendingTask.trigger({ data: payload });
			if (!res.hasError) {
				toast.success('Task Completed!!');
				onCancel();
				timeLineRefetch();
				refetch();
			}
		} catch (err) {
			toast.error(err.data);
		}
	};

	return {
		fields,
		error,
		controls,
		onError,
		onCreate,
		handleSubmit,
		loadingRate: loading,
		customLabels,
	};
};

export default useCommodityUpdate;
