import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const useTableView = ({ props, list, refetch, isVerticalHead }) => {
	const [rating, setRating] = useState({});
	const [feedback, setFeedback] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [selectedEmployees, setSelectedEmployees] = useState([]);
	const [isAllSelected, setIsAllSelected] = useState(false);

	const handleAllSelect = (e) => {
		setIsAllSelected(false);
		const { checked } = e.target;

		if (checked) {
			return setSelectedEmployees(list);
		}

		return setSelectedEmployees([]);
	};

	const handleSelectId = (e, item) => {
		setIsAllSelected(false);
		const { checked } = e.target;
		if (checked) {
			return setSelectedEmployees((prev) => ([...prev, item]));
		}
		const filterArr = selectedEmployees.filter((val) => val.id !== item.id);
		return setSelectedEmployees(filterArr);
	};

	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/update_and_publish_employee_rating',
		method : 'POST',
	}, { manual: true });

	const onSubmitFinalRating = async (isPublish = false, ratingData = {}) => {
		try {
			const employee_rating_data = Object.keys(rating).map((employee_id) => ({
				employee_id,
				rating   : rating?.[employee_id]?.value,
				comments : feedback?.[employee_id]?.value || '',
			}));

			const vertical_head_rating_data = selectedEmployees.map((val) => ({
				employee_id          : val.id,
				rating               : val.rating,
				comments             : val.comments,
				reporting_manager_id : val?.reporting_manager_id,
			}));

			const updateRatingData = !isEmpty(ratingData) ? [ratingData] : vertical_head_rating_data;

			const payload = {
				employee_rating_data : isVerticalHead ? updateRatingData : employee_rating_data,
				level                : props?.activeTab === 'functional_manager'
					? 'functional_manager' : props?.level,
				publish_rating         : isPublish,
				all_employees_selected : isAllSelected,
			};

			await trigger({ data: payload });
			Toast.success('Ratings updated successfully');
			setSelectedEmployees([]);
			refetch();
			setShowModal(false);
			setIsAllSelected(false);
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	useEffect(() => {
		if (!isEmpty(list)) {
			let defaultRating = {};
			let defaultFeedback = {};

			(list || []).forEach((element) => {
				if (element?.rating) {
					defaultRating = {
						...defaultRating,
						[element?.id]: {
							value    : element.rating,
							disabled : true,
						},
					};
				}
				if (element?.comments) {
					defaultFeedback = {
						...defaultFeedback,
						[element?.id]: {
							value    : element.comments,
							disabled : true,
						},
					};
				}
			});

			setRating((prev) => ({ ...prev, ...defaultRating }));
			setFeedback((prev) => ({ ...prev, ...defaultFeedback }));
		}
	}, [list]);

	return {
		rating,
		feedback,
		setRating,
		setFeedback,
		showModal,
		setShowModal,
		onSubmitFinalRating,
		updateApiLoading: loading,
		handleAllSelect,
		handleSelectId,
		selectedEmployees,
		setSelectedEmployees,
		setIsAllSelected,
		isAllSelected,
	};
};

export default useTableView;
