import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import getControls from '../configurations/create-form';

const useCreateUpdate = ({ selected, onClose }) => {
	const { profile = {} } = useSelector((state) => state);
	const { partner } = profile || {};
	const {
		handleSubmit,
		getValues,
		control,
		formState: { errors },
		watch,
		setValue,
	} = useForm();
	const endPoint = isEmpty(selected) ? '/create_standard_event' : 'update_standard_event';
	const [{ loading }, trigger] = useRequest(
		{
			url    : endPoint,
			method : 'post',
		},
		{ manual: true },
	);
	const onCreate = async () => {
		const formattedValues = getValues();
		const payload = isEmpty(selected) ? { ...formattedValues, performed_by_id: partner.id }
			: { data: { ...formattedValues }, performed_by_id: partner.id, id: selected.id };

		try {
			const res = await trigger({ data: { ...payload } });
			if (res?.data) {
				Toast.success('Standard milestones created successfully');
				onClose();
			}
		} catch (error) {
			Toast.error('Something went wrong');
		}
	};
	const fields = getControls();
	useEffect(() => {
		(fields || []).map((item) => setValue(item.name, selected[item.name]));
	}, [fields, selected, setValue]);
	return {
		handleSubmit,
		errors,
		watch,
		control,
		loading,
		onCreate,
		fields,
	};
};

export default useCreateUpdate;
