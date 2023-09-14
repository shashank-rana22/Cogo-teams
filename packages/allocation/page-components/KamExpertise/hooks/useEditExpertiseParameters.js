import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const FIRST_INDEX = 1;

const useEditExpertiseParameters = ({
	list = [],
	expertiseRefetch = () => {},
	setEditMode = () => {},
	cardRefetch,
	t = () => {},
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
			const ATTRIBUTES = [];

			list.forEach((group) => {
				group.data.forEach((service) => {
					const scores = { id: service.id };
					const SCORING_CRITERIA = {};

					Object.keys(formValues).forEach((formAttr) => {
						service.attributes.forEach((attr) => {
							if (attr.name === formAttr && formValues[formAttr]) {
								const attributeName = formAttr.substring(formAttr.indexOf('_') + FIRST_INDEX);
								SCORING_CRITERIA[attributeName] = formValues[formAttr];
							}
						});
					});

					scores.scoring_criteria = SCORING_CRITERIA;

					if (!isEmpty(scores.scoring_criteria)) {
						ATTRIBUTES.push(scores);
					}
				});
			});

			if (isEmpty(ATTRIBUTES)) {
				Toast.error(t('allocation:no_change_in_scores'));
				return;
			}
			const payload = { attributes: ATTRIBUTES };

			await trigger({
				data: payload,
			});

			expertiseRefetch();

			setEditMode(false);

			reset();

			cardRefetch();
			Toast.success(t('allocation:edited_successfully_toast'));
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
