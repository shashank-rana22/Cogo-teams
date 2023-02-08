import { useForm } from '@cogoport/forms';

import { getControls } from '../../../utils/filterControls';

const useFilters = ({ params = {}, setParams = () => {}, setShowFilters = () => {} }) => {
	const formProps = useForm();

	const onCancel = () => {
		setShowFilters(false);
	};

	const onSubmit = (values) => {
		const newValues = {};
		Object.keys(values).forEach((key) => { newValues[key] = values[key] || undefined; });

		setShowFilters(false);

		setParams({
			...params,
			filters: { ...(params.filters), ...newValues },
		});
	};

	const modifiedControls = getControls();

	return {
		controls: modifiedControls,
		formProps,
		onSubmit,
		onCancel,
	};
};

export default useFilters;
