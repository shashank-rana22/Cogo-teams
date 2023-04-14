import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

const MAPPING = {
	create: {
		tag   : '/create_faq_tag',
		topic : '/create_faq_topic',
	},
	update: {
		tag   : '/update_faq_tag',
		topic : '/update_faq_topic',
	},
};

function useCreateFaq() {
	const router = useRouter();

	const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm();

	const { general } = useSelector((state) => state);
	const { create = '', update = '', id } = general.query || {};

	const queryName = create ? 'create' : 'update';
	const queryValue = create || update;

	const initialState = () => {
		if (!queryValue) {
			return 'dashboard';
		}
		return queryValue;
	};

	const [configurationPage, setConfigurationPage] = useState(initialState());

	const [{ loading }, trigger] = useRequest({
		url    : MAPPING[queryName][queryValue],
		method : 'POST',
	}, { manual: true });

	const createFaqComponent = async (values) => {
		const { name, description } = values || {};
		let payload = {
			display_name : startCase(name),
			description,
			status       : 'active',
		};

		if (queryName === 'update') {
			payload = { ...payload, id };
		}

		try {
			const res = await trigger({
				data: payload,
			});

			if (res?.data) {
				Toast.success(`Faq ${startCase(queryValue)} ${queryName}d sucessfully`);
				setConfigurationPage('dashboard');
				router.back();
			}
		} catch (e) {
			if (e.response?.data) { Toast.error(getApiErrorString(e.response?.data)); }
		}
	};
	return {
		queryValue,
		createFaqComponent,
		configurationPage,
		setConfigurationPage,
		control,
		handleSubmit,
		errors,
		loading,
		setValue,
		reset,
	};
}

export default useCreateFaq;
