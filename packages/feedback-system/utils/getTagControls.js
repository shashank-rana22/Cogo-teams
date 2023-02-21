import { useGetAsyncOptions } from '@cogoport/forms';

const useGetTagControls = () => {
	const tagOptions = useGetAsyncOptions({
		endpoint    : 'list_question_tags',
		initialCall : false,
		params      : {
			filters: {
			},
		},
		valueKey : 'tag',
		labelKey : 'tag',
	});

	return {
		...tagOptions,
		label          : 'Tag Name',
		name           : 'tags',
		placeholder    : 'Select Tags...',
		type           : 'select',
		defaultOptions : true,
		isClearable    : true,
		span           : 5.5,
		validations    : [{ type: 'required', message: 'Required' }],
	};
};

export default useGetTagControls;
