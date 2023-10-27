import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useMemo } from 'react';

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
		general: { query = {} },
	} = useSelector((state) => state);
	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
		watch,
		...rest
	} = useForm();

	const { country_id = '' } = watch();

	const { vendor_services = {}, vendor_details = {} } = vendorInformation || {};

	const entityCode = Object.values(ENTITY_MAPPING).find((val) => vendor_details?.cogo_entity_id === val?.id)?.code;

	const getControls = useMemo(() => controls({ entityCode, country_id }), [country_id, entityCode]);

	const { partner_id = '', vendor_id } = query;

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

		getControls.forEach((item) => {
			setValue(`${item.name}`, vendor_services?.[item.name] || reformattedDataFromApi[item.name]);
		});
	}, [setValue, vendorInformation, vendor_services, getControls]);

	return {
		controls: getControls,
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
