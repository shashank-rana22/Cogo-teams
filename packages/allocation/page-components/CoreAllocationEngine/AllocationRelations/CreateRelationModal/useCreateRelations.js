import { useForm } from '@cogoport/forms';

import getCreateRelationsControls from '../../../../utils/get-create-relations-controls';

const useCreateRelations = () => {
	const controls = getCreateRelationsControls();

	const formProps = useForm({
		defaultValues: {
			relation_type: 'keep',
		},
	});

	const { handleSubmit } = formProps;

	return {
		controls,
		formProps,
		handleSubmit,
	};
};

export default useCreateRelations;
