import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useUpdateSegment = ({ getSegmentData }) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/update_communication_segment_control',
		method : 'POST',
	}, { manual: true });

	const updateSegment = async ({ val, id, type }) => {
		const isEdit = type === 'edit';

		let payload = {};

		if (isEdit) {
			payload = {
				...val,
				id,
				status: 'active',
			};
		} else {
			payload = {
				id,
				status: 'deactive',
			};
		}

		try {
			const res = await trigger({
				data: {
					...payload,
				},
			});
			setData(res?.data);
			getSegmentData();

			if (!isEdit) {
				Toast.success('Successfully deactivated');
			}
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		updateLoading: loading,
		updateSegment,
		data,
	};
};

export default useUpdateSegment;
