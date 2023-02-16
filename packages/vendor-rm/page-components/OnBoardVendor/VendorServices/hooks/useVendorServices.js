import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

// eslint-disable-next-line import/no-cycle
import TABS_MAPPING from '../../../../constants/tabs';
import controls from '../utils/controls';
import getFormattedServices from '../utils/getFormattedServices';

function useVendorServices({
	setActiveStepper = () => {},
	setVendorInformation = () => {},
}) {
	const { handleSubmit, control, setValue, formState: { errors }, ...rest } = useForm();

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
			const { key = '' } = TABS_MAPPING.find((item) => item.step === step);
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
