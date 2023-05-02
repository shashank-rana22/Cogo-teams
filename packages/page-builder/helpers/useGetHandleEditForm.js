const prefillControls = [
	'label',
	'type',
	'placeholder',
	'width',
	'options_type',
	'is_mandetory',
	'manual_options',
	'dynamic_data_endpoint',
	'options',
];

const useGetHandleEditForm = ({ setShowForm, setShow, setValue, modeType }) => {
	const handleEditForm = (values) => {
		if (modeType === 'edit') {
			const { api_url, buttonText, heading, controls: controlsPrefill } = values || {};
			setShowForm(false);

			setTimeout(() => {
				setShowForm(true);
			}, 100);

			setShow(true);
			setValue('api_url', api_url);
			setValue('buttonText', buttonText);
			setValue('heading', heading);

			(controlsPrefill || []).map((itemList, idx) => (prefillControls || []).map((item) => (
				setValue(`controls[${idx}][${item}]`, itemList[item])
			)));
		}
	};
	return {
		handleEditForm,
	};
};

export default useGetHandleEditForm;
