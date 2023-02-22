import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import getControls from '../utils/controls';
import createPOCOptions from '../utils/createPOCOptions';

function useCreateVendorServicePOC({
	setShowForm = () => {},
	getVendorData = {},
}) {
	const {
		general : { query = {} },
	} = useSelector((state) => state);

	const { partner_id = '' } = query;

	const {
		handleSubmit,
		formState,
		control,
		watch,
	} = useForm();

	const { errors } = formState;

	const watchCategory = watch('category');

	console.log('getVendorData:: ', getVendorData);

	const { pocs = [] } = getVendorData || {};

	const pocOptions = createPOCOptions({ pocs });

	const controls = getControls({ watchCategory });

	const [{ loading: createVendorServicePocLoading }, triggerCreateVendorServicePoc] = useRequest({
		url    : '/create_vendor_service_poc',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async (data) => {
		console.log('data:: ', data);

		try {
			const payload = {
				...data,
				cogo_entity_id: partner_id,
			};

			await triggerCreateVendorServicePoc({ data: payload });

			Toast.success('Service POC added successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};

	const handleCancel = () => {
		setShowForm('');
	};

	return {
		controls,
		control,
		handleSubmit,
		onSubmit,
		errors,
		handleCancel,
		createVendorServicePocLoading,
	};
}

export default useCreateVendorServicePOC;
