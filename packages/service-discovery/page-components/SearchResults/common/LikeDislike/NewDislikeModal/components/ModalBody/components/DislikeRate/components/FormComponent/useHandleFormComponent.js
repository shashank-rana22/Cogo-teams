import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import getPayload from '../../../../../../utils/getPayload';

const getErrorMessage = (error, name) => {
	if (!['preferred_freight_rate'].includes(name)) {
		return error.message || 'This is Required';
	}

	if (isEmpty(error)) {
		return null;
	}

	if (error.price?.type === 'min') {
		return 'price should be greater than 0';
	}

	return `${startCase(
		Object.keys(error)[GLOBAL_CONSTANTS.zeroth_index],
	)} is Required`;
};

const useHandleFormComponent = ({
	unsatisfiedFeedbacks = {},
	createTrigger = () => {},
	getSpotSearchRateFeedback = () => {},
	setUnsatisfiedFeedbacks = () => {},
	reason = '',
	setSelectedReasons = () => {},
}) => {
	const {
		data = {},
		values,
		details,
		rate,
		selectedSevice,
		spot_search_id,
	} = unsatisfiedFeedbacks;

	const handleValidateFeedback = async (value) => {
		try {
			if (value === 'no') {
				const finalPayload = getPayload({
					satisfiedfeedbacks: [reason],
					values,
					details,
					rate,
					selectedSevice,
					spot_search_id,
				});

				await createTrigger({ data: finalPayload });

				getSpotSearchRateFeedback();
			} else {
				setUnsatisfiedFeedbacks((prev) => ({
					...prev,
					data: Object.entries(prev.data || {}).reduce((acc, [key, keyValue]) => {
						if (reason === key) {
							return acc;
						}
						return { ...acc, [key]: keyValue };
					}, {}),
				}));

				setSelectedReasons((prev) => prev.filter((item) => item !== reason));
			}
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		handleValidateFeedback,
		data,
		getErrorMessage,
	};
};

export default useHandleFormComponent;
