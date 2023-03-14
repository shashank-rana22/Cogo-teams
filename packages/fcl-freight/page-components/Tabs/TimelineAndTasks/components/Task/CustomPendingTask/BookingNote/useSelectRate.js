import { useState, useEffect } from 'react';
import getField from '@cogo/business-modules/form/components';
import { useFormCogo } from '@cogoport/front/hooks';
import useGetSuppier from '../../../../../commons/Layout/SupplierSelect/useGetSupplier';
import useUpdateBookingPreference from '../../../../hooks/useUpdateBookingPreference';

const getControls = (services) => {
	return [
		{
			name: 'shipping_line_id_fcl_main',
			label: 'Shipping Line',
			type: 'select',
			optionsListKey: 'shipping-lines',
			placeholder: 'Select Shipping Line',
			span: 5,
			rules: {
				required: { value: true, message: 'Shipping line is required' },
			},
			className: 'primary sg',
		},
		{
			name: 'service_provider_id_fcl_main',
			type: 'select',
			label: 'Service Provider',
			optionsListKey: 'verified-service-providers',
			placeholder: 'Select Service Provider',
			multiple: false,
			rules: {
				required: { value: true, message: 'Service Provider is required' },
			},
		},
		{
			name: 'shipping_line_id_fcl_local',
			label: 'Shipping Line',
			type: 'select',
			optionsListKey: 'shipping-lines',
			placeholder: 'Select Shipping Line',
			disabled: true,
			span: 5,
			value: (services || []).find(
				(serviceObj) => serviceObj.service_type === 'fcl_freight_service',
			)?.shipping_line_id,
			rules: {
				required: { value: true, message: 'Shipping line is required' },
			},
			className: 'primary sg',
		},
		{
			name: 'service_provider_id_fcl_local',
			type: 'select',
			label: 'Service Provider',
			optionsListKey: 'verified-service-providers',
			placeholder: 'Select Service Provider',
			multiple: false,
			rules: {
				required: { value: true, message: 'Service Provider is required' },
			},
		},
	];
};

const useSelectRate = ({ services, task }) => {
	const { updateConfirmation } = useUpdateBookingPreference();
	const { data, loading } = useGetSuppier({
		service_id: task.service_id,
		service_type: task.service_type,
	});

	const selected_priority = (data?.list || []).find(
		(item) => item?.priority === item?.selected_priority,
	);

	const Select = getField('select');

	const injectedControls = getControls(services);

	const { fields, watch, handleSubmit, setValue } =
		useFormCogo(injectedControls);

	const [selectedCard, setSelectedCard] = useState({});

	const formValues = watch();

	useEffect(() => {
		setSelectedCard(selected_priority);
	}, [selected_priority]);

	fields.shipping_line_id_fcl_local.itemKey =
		formValues.shipping_line_id_fcl_local;

	useEffect(() => {
		setValue(
			'shipping_line_id_fcl_local',
			formValues.shipping_line_id_fcl_main,
		);
	}, [formValues.shipping_line_id_fcl_main]);

	return {
		list: data?.list,
		loading,
		selectedCard,
		setSelectedCard,
		fields,
		Select,
		formValues,
		updateConfirmation,
		handleSubmit,
	};
};

export default useSelectRate;
