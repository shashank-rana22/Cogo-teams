import { toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import getControls from '../helpers/getControls';

const useNominationTask = ({
	task,
	getTaskConfigApi,
	api,
	shipment_data,
	onCancel = () => {},
	refetch = () => {},
	shipment_overall_data = {},
}) => {
	const controls = getControls({
		task,
		taskData: getTaskConfigApi?.data,
		shipment_data,
		shipment_overall_data,
	});

	// eslint-disable-next-line max-len
	const subject = `Nomination//SID:${shipment_data.serial_id}//${shipment_data?.origin_port?.display_name}-${shipment_data?.destination_port?.display_name}//${shipment_data?.cargo_weight_per_container}`;

	const [error, setError] = useState({});

	const onError = (err) => {
		setError({ ...err });
	};

	const { trigger, loading, data } = useRequest('post', false)(api);

	const updateData = async (params) => {
		const res = await trigger({
			params,
		});
		if (!res.hasError) {
			if (params?.show_preview_only === false) {
				toast.success('Nomination Details Updated Successfully');
				onCancel();
				refetch();
			}
		}
	};

	return {
		controls,
		loading,
		updateData,
		error,
		onError,
		subject,
		data,
	};
};

export default useNominationTask;
