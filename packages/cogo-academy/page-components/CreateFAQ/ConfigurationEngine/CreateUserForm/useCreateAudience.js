import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
// import { useState } from 'react';

function useCreateAudience({ setConfigurationPage }) {
	const router = useRouter();

	const { control, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();

	// const { general } = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_faq_audience',
		method : 'POST',
	}, { manual: true });

	const createAudience = async (values) => {
		const {
			platform,
			persona,
			auth_function,
			auth_sub_function,
			cogo_entity_id,
			country_id,
			name,
		} = values || {};

		const payload = {
			audiences: [{
				platform,
				persona,
				auth_function,
				auth_sub_function,
				cogo_entity_id,
				country_id,
				name,
			},

			],
		};

		try {
			const res = await trigger({
				data: payload,
			});

			if (res?.data) {
				Toast.success('Audience created sucessfully');
				setConfigurationPage('dashboard');
				router.back();
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};
	return {
		createAudience,
		control,
		handleSubmit,
		errors,
		setValue,
		reset,
		watch,
		loading,

	};
}

export default useCreateAudience;
