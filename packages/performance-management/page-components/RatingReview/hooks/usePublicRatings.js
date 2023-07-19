import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import { formattedDate } from '../../../common/formattedDate';

const getPayload = ({ toggleVal, selectedEmployees, manager_user_id, level, activeTab, selectCycle }) => {
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

	const employee_data = (level === 'vertical_head' && activeTab === 'vertical_head') ? resultArray : flattenedArray;
	const { end_date, start_date } = selectCycle || {};

	return {
		employee_data,
		manager_user_id,
		start_date : formattedDate(start_date),
		end_date   : formattedDate(end_date),
		level      : level === 'vertical_head' ? activeTab : level,
	};
};

const usePublishRatings = ({ selectedEmployees, level, selectCycle, activeTab, fetchRatingReviewDetails }) => {
	const { user = {} }	 = useSelector((state) => state?.profile || {});

	const [toggleVal, setToggleVal] = useState([]);

	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/publish_ratings',
		method : 'POST',
	}, { manual: true });

	const publishRatings = async () => {
		const payload = getPayload({
			selectCycle,
			manager_user_id: user?.id,
			level,
			activeTab,
			selectedEmployees,
			toggleVal,
		});

		try {
			await trigger({
				data: payload,
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
