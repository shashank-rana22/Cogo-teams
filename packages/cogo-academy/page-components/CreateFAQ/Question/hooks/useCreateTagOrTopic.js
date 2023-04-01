import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
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

function useCreateNewTagOrTopic({ fetchTopics, fetchTags }) {
	const [queryValue, setQueryValue] = useState('');

	const [show, setShow] = useState(false);

	const [showCreateAudienceModal, setShowCreateAudienceModal] = useState(false);

	const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm();

	const resetNameAndDescription = () => {
		setValue('name', '');
		setValue('description', '');
	};

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
			display_name: startCase(name),
			description,
		};

		try {
			const res = await trigger({
				data: payload,
			});

			if (queryValue === 'tag') {
				fetchTags();
			} else { fetchTopics(); }

			if (res?.data) {
				Toast.success(`${queryValue} ${queryName}d sucessfully`);
				resetNameAndDescription();
				setShow(false);
			}
		} catch (err) {
			Toast.error(err?.response?.data?.base);
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

	const onClickCancelButton = () => {
		resetNameAndDescription();
		setShow(false);
	};

	return {
		createFaqComponent,
		configurationPage,
		setConfigurationPage,
		control,
		handleSubmit,
		formErrors : errors,
		loading,
		setValue,
		resetValue : reset,
		setQueryValue,
		queryValue,
		handleCreateTag,
		handleCreateTopic,
		show,
		setShow,
		onClickCancelButton,
		showCreateAudienceModal,
		setShowCreateAudienceModal,
	};
}

export default useCreateNewTagOrTopic;
