import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useState } from 'react';

const usePublishRatings = ({ selectedEmployees, level, selectCycle, activeTab, fetchRatingReviewDetails }) => {
	const { end_date, start_date } = selectCycle || {};
	const { user = {} }	 = useSelector((state) => state?.profile || {});

	const [toggleVal, setToggleVal] = useState([]);

	const SELECTED_EMPLOYEES_LIST = [];

	(Object.keys(selectedEmployees) || [])
		.map((element) => SELECTED_EMPLOYEES_LIST.push(selectedEmployees[element]));

	const flattenedArray = SELECTED_EMPLOYEES_LIST.flat();

	const combinedArray = flattenedArray.map((element) => {
		if (!toggleVal[element]) {
			return [element, false];
		}
		return [element, toggleVal[element]];
	});

	const resultArray = combinedArray.map(([employee_id, surprise_gift]) => ({
		employee_id,
		surprise_gift,
	}));

	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/publish_ratings',
		method : 'POST',
	}, { manual: true });

	const employee_data = (level === 'vertical_head' && activeTab === 'vertical_head') ? resultArray : flattenedArray;

	const publishRatings = async () => {
		try {
			await trigger({
				data: {
					employee_data,
					manager_user_id : user?.id,
					start_date      : format(start_date, 'YYYY-MM-dd'),
					end_date        : format(end_date, 'YYYY-MM-dd'),
					level           : level === 'vertical_head' ? activeTab : level,
				},
			});
			fetchRatingReviewDetails();
			Toast.success('Rating has been updated successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		publishRatings,
		loading,
		selectedEmployees,
		level,
		toggleVal,
		setToggleVal,
	};
};

export default usePublishRatings;
