import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import getCreateFclRatePayload from '../helpers/getCreateFclRatePayload';
import toastApiError from '../utils/toastApiError';

const useCreateUpdateFclWeightSlabs = ({
	item,
	setItem,
	successMessage = 'WeightSlabs Added Successfully!',
	refetch = () => {},
}) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const [isCogoAssured, setIsCogoAssured] = useState(item?.is_cogo_assured);

	const handleCloseModal = () => {
		setItem(false);
	};

	const [{ loading }, trigger] = useRequest({
		url    : '/create_fcl_weight_slabs_configuration',
		method : 'POST',
		scope,
	});

	const apiTrigger = async (val) => {
		try {
			const payload = getCreateFclRatePayload({ data: val });

			const res = await trigger({ data: payload });

			Toast.success(successMessage);
			refetch();
			return res;
		} catch (err) {
			toastApiError(err);
			return err;
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
