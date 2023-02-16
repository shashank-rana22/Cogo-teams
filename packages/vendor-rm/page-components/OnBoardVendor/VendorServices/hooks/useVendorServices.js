import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

// eslint-disable-next-line import/no-cycle
import TABS_MAPPING from '../../../../constants/tabs';
import controls from '../utils/controls';

function useVendorServices({
	setActiveStepper = () => {},
}) {
	const { handleSubmit, control, setValue, formState: { errors }, ...rest } = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_vendor_services',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async ({ data, step }) => {
		try {
			const { office_details = [] } = data || {};

			const formattedServices = office_details.map((item) => {
				const obj = {
					category           : item?.category,
					sub_category       : item?.sub_category,
					cogoport_office_id : item?.cogoport_office_id,
					cogo_entity_id     : '',
				};

				return obj;
			});

			const payload = {
				performed_by_id   : '',
				performed_by_type : '',
				vendor_id         : '',
				services          : formattedServices,
			};

			await trigger({ data: payload });

			Toast.success('Services added successfully');
			setActiveStepper(TABS_MAPPING[step]);
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};

	const onBack = (step) => {
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
		onBack,
		...rest,
	};
}

export default useVendorServices;
