import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import subCategoryOptions from '../../../../../../../../utils/sub-category-options';
import getControls from '../utils/controls';
import createPOCOptions from '../utils/createPOCOptions';

function useCreateVendorServicePOC({
	setShowForm = () => {},
	getVendorData = {},
	refetchServicesPocs = () => {},
	refetchVendorInfo = () => {},
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
		setValue,
	} = useForm();

	const { errors } = formState;

	const watchCategory = watch('category');
	const watchPOC = watch('poc_id');

	const { pocs = [] } = getVendorData || {};

	const { pocOptions = {} } = createPOCOptions({ pocs, watchPOC });

	const controls = getControls({ watchCategory, pocOptions });

	const [{ loading: createVendorServicePocLoading }, triggerCreateVendorServicePoc] = useRequest({
		url    : '/create_vendor_service_poc',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async (data) => {
		try {
			const { poc_role = [] } = (pocs || []).find((poc) => poc.id === watchPOC);

			const payload = {
				...data,
				cogo_entity_id : partner_id,
				vendor_id      : getVendorData?.vendor_details?.id,
				poc_role,
			};

			await triggerCreateVendorServicePoc({ data: payload });

			refetchVendorInfo();
			refetchServicesPocs();

			setShowForm('');
			Toast.success('Service POC added successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	useEffect(() => {
		const selectedCategory = watch('category');
		setValue('sub_category', subCategoryOptions[selectedCategory]?.[0]?.value || '');
	}, [setValue, watch, watchCategory]);

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
		watch,
		setValue,
	};
}

export default useCreateVendorServicePOC;
