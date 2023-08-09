import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

// const nameMapping = {
// 	freights_charge_codes          : 'freights',
// 	destination_local_charge_codes : 'destination_local',
// 	origin_local_charge_codes      : 'origin_local',
// 	customs_charge_codes           : 'freights',
// };
const useAddRate = () => {
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));
	const { control, handleSubmit, watch } = useForm({
		freights: {
			code             : '',
			price            : '',
			currency         : '',
			min_price        : '',
			cbm_weight_ratio : '',
			unit             : '',
		},
	});
	const [errors, setErrors] = useState();

	const [{ loading }, trigger] = useRequest({
		url    : 'create_lcl_freight_rate',
		method : 'post',
	}, { manual: true });

	const postApi = async (values) => {
		await trigger({
			params: { ...values, commodity: 'general', procured_by_id: user_profile?.user?.id },
		});
	};

	const value = watch();

	return {
		control,
		handleSubmit,
		loading,
		errors,
		postApi,
		value,
		setErrors,
	};
};

export default useAddRate;
