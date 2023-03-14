import { useFormCogo } from '@cogoport/front/hooks';
import { useEffect } from 'react';

const controls = [
	{
		name: 'url',
		showLabel: false,
		span: 12,
		type: 'file',
		themeType: 'secondary',
		drag: true,
		uploadIcon: 'ic-upload',
		label: '',
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType: 'aws',
		rules: { required: { value: true, message: 'Document is required' } },
		multiple: true,
	},
];

const useUploadDocument = ({ setFileUrl }) => {
	const { fields, watch, handleSubmit } = useFormCogo(controls);

	const formValues = watch();

	useEffect(() => {
		if (formValues.url) {
			setFileUrl(formValues.url);
		}
	}, [JSON.stringify(formValues)]);

	return {
		fields,
		controls,
		handleSubmit,
	};
};

export default useUploadDocument;
