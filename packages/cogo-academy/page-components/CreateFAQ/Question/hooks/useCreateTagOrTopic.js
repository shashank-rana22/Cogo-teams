import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
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

function useCreateNewTagOrTopic() {
	const [queryValue, setQueryValue] = useState('');

	const [show, setShow] = useState(false);

	const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm();

	const queryName = 'create';

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

		const payload = {
			name,
			display_name: name,
			description,
		};

		try {
			const res = await trigger({
				data: payload,
			});

			if (res?.data) {
				Toast.success(`${queryValue} ${queryName}d sucessfully`);
				setShow(false);
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	const handleCreateTag = () => {
		setShow(true);
		setQueryValue('tag');
	};

	const handleCreateTopic = () => {
		setShow(true);
		setQueryValue('topic');
	};

	return {
		createFaqComponent,
		configurationPage,
		setConfigurationPage,
		control,
		handleSubmit,
		errors,
		loading,
		setValue,
		reset,
		setQueryValue,
		queryValue,
		handleCreateTag,
		handleCreateTopic,
		show,
		setShow,
	};
}

export default useCreateNewTagOrTopic;
