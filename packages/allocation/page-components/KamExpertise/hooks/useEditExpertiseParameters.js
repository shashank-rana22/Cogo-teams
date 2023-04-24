import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const useEditExpertiseParameters = ({
	list = [],
	expertiseRefetch = () => {},
	setEditMode = () => {},
	cardRefetch,
}) => {
	const formProps = useForm();

	const { handleSubmit, control, reset } = formProps;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_event_scoring_attribute',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_event_scoring_attribute',
	}, { manual: true });

	const onSave = async (formValues = {}) => {
		try {
			const attributes = [];

			list.forEach((group) => {
				group.data.forEach((service) => {
					const scores = { id: service.id };
					const scoring_criteria = {};

					Object.keys(formValues).forEach((formAttr) => {
						service.attributes.forEach((attr) => {
							if (attr.name === formAttr && formValues[formAttr]) {
								const attributeName = formAttr.substring(formAttr.indexOf('_') + 1);
								scoring_criteria[attributeName] = formValues[formAttr];
							}
						});
					});

					scores.scoring_criteria = scoring_criteria;

					if (!isEmpty(scores.scoring_criteria)) {
						attributes.push(scores);
					}
				});
			});

			if (isEmpty(attributes)) {
				Toast.error('No change in scores');
				return;
			}
			const payload = { attributes };

			await trigger({
				data: payload,
			});

			expertiseRefetch();

			setEditMode(false);

			reset();

			cardRefetch();
			Toast.success('Edited Successfully!');
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		handleSubmit,
		onSave,
		control,
		loading,
	};
};

export default useEditExpertiseParameters;
