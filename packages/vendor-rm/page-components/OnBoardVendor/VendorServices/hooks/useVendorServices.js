import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import COMPONENT_MAPPING from '../../../../utils/component-props-mapping';
import controls from '../utils/controls';
import getFormattedServices from '../utils/getFormattedServices';
import reFormatServices from '../utils/reFormatServices';

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

	const {
		general : { query = {} },
	} = useSelector((state) => state);

	const { partner_id = '', vendor_id } = query;

	const { vendor_services } = vendorInformation;

	const isUpdateAction = !isEmpty(vendor_services);

	const [{ loading }, trigger] = useRequest({
		url    : isUpdateAction ? '/update_vendor_services' : '/create_vendor_services',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async ({ data, step }) => {
		try {
			const { formattedServices = [] } = getFormattedServices({ data, partner_id });

			const payload = {
				vendor_id,
				services: formattedServices,
			};

			await trigger({ data: payload });

			setVendorInformation((pv) => {
				const { key = '' } = COMPONENT_MAPPING.find((item) => item.step === step);
				return {
					...pv,
					[key]: data,
				};
			});

			Toast.success(`Services ${isUpdateAction ? 'updated' : 'added'} successfully`);

			setActiveStepper('payment_details');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	useEffect(() => {
		const { services = [] } = vendorInformation || {};

		const { reformattedDataFromApi = {} } = reFormatServices({ services });

		controls.forEach((item) => {
			setValue(`${item.name}`, vendor_services?.[item.name] || reformattedDataFromApi[item.name]);
		});
	}, [setValue, vendorInformation, vendor_services]);

	return {
		controls,
		handleSubmit,
		control,
		setValue,
		errors,
		onSubmit,
		loading,
		watch,
		...rest,
	};
}

export default useVendorServices;
