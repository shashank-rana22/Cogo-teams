import { useForm } from '@cogoport/forms';

import { getControls } from '../../../utils/filterControls';

const useFilters = ({ params = {}, setParams = () => {}, setShowFilters = () => {} }) => {
	const formProps = useForm();

	const onCancel = () => {
		setShowFilters(false);
	};

	const onSubmit = async (values) => {
		if (!values) return;
		setShowFilters(false);

		setParams({
			...params,
			filters: { ...(params.filters), ...values },
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
