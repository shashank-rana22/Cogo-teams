import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

// import useCreateFaq from './useCreateFaq';
import useCreateFaqTag from './useCreateFaqTag';
import useCreateFaqTopic from './useCreateFaqTopic';

function useConfigurationEngine() {
	const { general } = useSelector((state) => state);

	const { create } = general.query || {};

	const [configurationPage, setConfigurationPage] = useState(create || 'dashboard');

	const { onClickSaveButton } = useCreateFaqTopic();

	const { onClickSaveButton: onClickTagSaveButton } = useCreateFaqTag();

	const { control, handleSubmit, formState: { errors } } = useForm();

	// const a= configurationPage.includes

	// const {} = useCreateFaq({ configurationPage });

	return {
		configurationPage,
		setConfigurationPage,
		onClickSaveButton,
		control,
		handleSubmit,
		errors,
		onClickTagSaveButton,
	};
}

export default useConfigurationEngine;
