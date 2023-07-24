import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getShowElements from '../components/RaiseAlarm/helpers/getShowElements';
import getSupplierDocuments from '../components/RaiseAlarm/helpers/getSupplierDocuments';
import getUnique from '../components/RaiseAlarm/helpers/getUniqueServiceProviders';
import okamControls from '../components/RaiseAlarm/utils/okamControls';
import okamOptions from '../components/RaiseAlarm/utils/okamOptions.json';
import so2Controls from '../components/RaiseAlarm/utils/so2Controls';
import sop2Options from '../components/RaiseAlarm/utils/so2Options.json';
import toastApiError from '../utils/toastApiError';

const FIRST_INDEX = 1;
const SUPPLIER_OPTION_LENGTH_ONE = 1;

const service_ops_constants = ['booking_agent', 'supply_agent'];
const okam_constants = [
	'sales_agent',
	'service_ops1',
	'service_ops2',
	'service_ops3',
	'booking_agent',
	'user',
];

const useCreateShipmentFaultAlarm = ({
	setShow = () => {},
	shipment_data = {},
	checkedLineItem = [],
	checkedProforma = '',
	alarmId,
	setAlarmId = () => {},
	StakeHolderList = [],
	val = '',
	setVal = () => {},
	handleClose = () => {},
	loadingServiceProvider,
	serviceProviderList = [],
}) => {
	const { stakeholder_types, id, importer_exporter_id } = shipment_data || {};

	const [errors, setErrors] = useState({});
	const [critical, setCritical] = useState('');
	const [supplierId, setSupplierId] = useState('');

	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_fault_alarm',
		method : 'POST',
	}, { manual: true });

	const uniqueServiceProvider = getUnique(serviceProviderList);

	const supplierOptions = loadingServiceProvider
		? [
			{
				label : '',
				value : '',
			},
		]
		: uniqueServiceProvider?.map((item) => ({
			label : item?.service_provider?.business_name,
			value : item?.service_provider?.id,
		}));

	const SUPPLY_AGENT = [];

	const uniqueStakeHolder = getUnique(StakeHolderList);
	uniqueStakeHolder
		?.filter((item) => item?.stakeholder_type === 'supply_agent')
		?.forEach((user) => {
			const list = { label: user?.user?.name, value: user?.user?.id };
			SUPPLY_AGENT.push(list);
		});

	const serviceDocsOptions = getSupplierDocuments(
		serviceProviderList,
		supplierId,
	);

	useEffect(() => {
		if (stakeholder_types?.includes('service_ops2')) {
			setVal('service_ops2');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stakeholder_types?.includes('service_ops2')]);

	let controls = [];
	if (stakeholder_types?.includes('booking_agent') || val === 'okam') {
		controls = okamControls;
	} else if (
		stakeholder_types?.includes('service_ops2')
		|| val === 'service_ops2'
	) {
		controls = so2Controls(
			supplierOptions,
			SUPPLY_AGENT,
			serviceDocsOptions,
		);
	}

	const { control, watch, handleSubmit, setValue, reset } = useForm();
	const formValues = watch();

	useEffect(() => {
		setSupplierId(formValues?.supplier_id);
	}, [formValues?.supplier_id]);

	useEffect(() => {
		if (supplierOptions.length === SUPPLIER_OPTION_LENGTH_ONE) {
			setValue('supplier_id', supplierOptions[GLOBAL_CONSTANTS.zeroth_index]?.value);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [val]);

	const profile =		stakeholder_types?.includes('booking_agent') || val === 'okam'
		? 'okam'
		: 'sop2';
	const finalShowElements = getShowElements(
		controls,
		formValues,
		profile,
		SUPPLY_AGENT,
	);

	const constants = stakeholder_types?.includes('booking_agent')
		? okam_constants
		: service_ops_constants;

	useEffect(() => {
		if (stakeholder_types?.includes('booking_agent') || val === 'okam') {
			(okamOptions || []).map((item) => {
				if (formValues?.fraud_reason === item?.value) {
					setCritical(item?.criticality);
				}
				return null;
			});
		} else if (
			stakeholder_types?.includes('service_ops2')
			|| val === 'service_ops2'
		) {
			(sop2Options || []).map((item) => {
				if (formValues?.fraud_reason === item?.value) {
					setCritical(item?.criticality);
				}
				return null;
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formValues?.fraud_reason]);

	const handleOnClose = () => {
		handleClose();
		reset();
		setShow(false);
	};

	const onCreate = async (values) => {
		const PAYLOAD = {};

		const criticality_value = values?.fraud_reason?.split('-')[FIRST_INDEX];

		Object.keys(values).forEach((value) => {
			const hasValue = values[value];
			if (hasValue) {
				PAYLOAD[value] = hasValue;
			} else {
				PAYLOAD[value] = undefined;
			}
		});
		const id_to_send =			stakeholder_types?.includes('booking_agent') || val === 'okam'
			? importer_exporter_id
			: PAYLOAD?.supplier_id;

		try {
			const res = await trigger({
				data: {
					shipment_id       : id,
					organization_id   : id_to_send,
					criticality       : criticality_value || critical,
					stakeholder_types : constants,
					status            : 'active',
					alarm_reason      : {
						...PAYLOAD,
						invoice_no : checkedProforma,
						line_items : checkedLineItem,
					},
				},
			});
			setAlarmId(res?.data?.id);
			Toast.success('Alarm Raised!');
			handleOnClose();
		} catch (error) {
			Toast.error(error?.data?.alarm);
			let errorObj = {};

			if (error?.data?.poc_mobile) {
				const message = error?.data?.poc_mobile;
				errorObj = {
					...errorObj,

					mobile_number: {
						type: 'custom',
						message,
					},
				};
			}

			if (!isEmpty(Object.keys(errorObj))) {
				setErrors(errorObj);
			} else toastApiError(error);
		}
	};

	return {
		onCreate,
		loading,
		control,
		controls,
		setErrors,
		errors,
		finalShowElements,
		handleSubmit,
		alarmId,
		formValues,
		reset,
		supplierOptions,
	};
};

export default useCreateShipmentFaultAlarm;
