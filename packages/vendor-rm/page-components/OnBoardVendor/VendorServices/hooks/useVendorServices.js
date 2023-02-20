/* eslint-disable import/no-cycle */
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import TABS_MAPPING from '../../../../constants/tabs';
import COMPONENT_MAPPING from '../../../../utils/component-mapping';
import getControls from '../utils/controls';
import getFormattedServices from '../utils/getFormattedServices';

function useVendorServices({
	setActiveStepper = () => {},
	vendorInformation = {},
	setVendorInformation = () => {},
}) {
	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
		watch,
		...rest
	} = useForm();

	const controls = getControls();

	const {
		general : { query = {} },
	} = useSelector((state) => state);

	const { partner_id = '' } = query;

	const [{ loading }, trigger] = useRequest({
		url    : '/create_vendor_services',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async ({ data, step }) => {
		setVendorInformation((pv) => {
			const { key = '' } = COMPONENT_MAPPING.find((item) => item.step === step);
			return {
				...pv,
				[key]: data,
			};
		});

		try {
			const { formattedServices = [] } = getFormattedServices({ data, partner_id });

			const payload = {
				performed_by_id   : '',
				performed_by_type : '',
				vendor_id         : vendorInformation?.vendor_details?.id,
				services          : formattedServices,
			};

			await trigger({ data: payload });

			Toast.success('Services added successfully');
			setActiveStepper('payment_details');
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};

	useEffect(() => {
		const { vendor_services = {}, services: office_details = [] } = vendorInformation || {};

		const prefill_obj = {
			office_details,
		};

		controls.forEach((item) => {
			setValue(`${item.name}`, vendor_services?.[item.name] || prefill_obj[item.name]);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vendorInformation]);

	const handleBackLink = (step) => {
		setActiveStepper(TABS_MAPPING[step]);
	};

	return {
		controls,
		handleSubmit,
		control,
		setValue,
		errors,
		onSubmit,
		loading,
		handleBackLink,
		watch,
		...rest,
	};
}

export default useVendorServices;
