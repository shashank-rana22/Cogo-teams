import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import getCreateUpdateWeightSlabPayload from '../helpers/getCreateUpdateWeightSlabPayload';
import toastApiError from '../utils/toastApiError';

const useCreateUpdateFclWeightSlabs = ({
	item = {},
	setItem = () => {},
	successMessage = 'WeightSlabs Added Successfully!',
	refetch = () => {},
}) => {
	const [isCogoAssured, setIsCogoAssured] = useState(item?.is_cogo_assured);

	let url = '/create_fcl_weight_slabs_configuration';
	if (item?.isEdit) {
		url = '/update_fcl_weight_slabs_configuration';
	}

	const handleCloseModal = () => {
		setItem(false);
	};

	const [{ loading }, trigger] = useRequest({
		url,
		method: 'POST',
	}, { manual: true });

	const apiTrigger = async (values) => {
		try {
			const payload = getCreateUpdateWeightSlabPayload({ values, item, isCogoAssured });

			await trigger({ data: payload });

			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		apiTrigger,
		isCogoAssured,
		setIsCogoAssured,
		handleCloseModal,
	};
};

export default useCreateUpdateFclWeightSlabs;
