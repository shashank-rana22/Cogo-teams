import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getPayload from '../../../../../../utils/getPayload';

const useHandleSelectedReasonsForm = ({
	selectedSevice = {},
	details = {},
	rate = {},
	selectedReasons,
	feedbacks = [],
	getSpotSearchRateFeedback = () => {},
	isFeedbackSubmitted = false,
	setSelectedSevice = () => {},
	setUnsatisfiedFeedbacks = () => {},
}) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { spot_search_id = '' } = query;

	const [showDiscardModal, setShowDiscardModal] = useState(false);
	const [closingRemarks, setClosingRemarks] = useState({ closing_remarks: [], other_reason: '' });

	const { closing_remarks = [], other_reason = '' } = closingRemarks;

	const [{ loading = false }, trigger] = useRequest(
		{
			method : 'POST',
			url    : '/validate_rate_feedback',
		},
		{ manual: true },
	);

	const [{ loading: createLoading = false }, createTrigger] = useRequest(
		{
			method : 'POST',
			url    : '/create_spot_search_rate_card_feedback',
		},
		{ manual: true },
	);

	const [{ loading: deleteLoading = false }, deleteTrigger] = useRequest(
		{
			method : 'POST',
			url    : '/delete_spot_search_rate_feedback',
		},
		{ manual: true },
	);

	const onSubmit = async (values) => {
		const {
			freight_price_discounted,
			freight_price_currency = '',
			rate_id = '',
			service_type = '',
		} = selectedSevice;

		try {
			const restFeedbacks = selectedReasons.filter((reason) => !feedbacks.includes(reason));

			if (isEmpty(restFeedbacks)) {
				Toast.error('Please select atleast one reason');
				return;
			}

			const { data: validateData = {} } = await trigger({
				data: {
					feedbacks : restFeedbacks,
					rate_id,
					service_type,
					currency  : freight_price_currency,
					price     : freight_price_discounted,
				},
			});

			setUnsatisfiedFeedbacks({
				data: validateData,
				values,
				details,
				rate,
				selectedSevice,
				spot_search_id,
			});

			const satisfiedfeedbacks = restFeedbacks.filter((item) => !Object.keys(validateData).includes(item));

			if (isEmpty(satisfiedfeedbacks)) {
				return;
			}

			const finalPayload = getPayload({
				satisfiedfeedbacks,
				values,
				details,
				rate,
				selectedSevice,
				spot_search_id,
			});

			await createTrigger({ data: finalPayload });

			getSpotSearchRateFeedback();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	const deleteServiceFeedback = async () => {
		try {
			if (closing_remarks.includes('other_reason') && !other_reason) {
				Toast.error('Please give the reason for closing');
				return;
			}

			await deleteTrigger({
				data: {
					selected_card_id : rate.id,
					service_id       : selectedSevice.service_id,
					closing_remarks  : closing_remarks.reduce((acc, cur) => {
						if (cur === 'other_reason') {
							return [...acc, other_reason];
						}

						return [...acc, cur];
					}, []),
				},
			});
			setShowDiscardModal(false);

			getSpotSearchRateFeedback();

			Toast.success('Service discarded successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	const onDeleteServiceFeedback = () => {
		if (!isFeedbackSubmitted) {
			setSelectedSevice({});
			return;
		}

		setShowDiscardModal(true);
	};

	return {
		onSubmit,
		loading: loading || createLoading || deleteLoading,
		createTrigger,
		onDeleteServiceFeedback,
		deleteServiceFeedback,
		showDiscardModal,
		setShowDiscardModal,
		closingRemarks,
		setClosingRemarks,
	};
};

export default useHandleSelectedReasonsForm;
