import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useTableView = ({ props, list, refetch }) => {
	const [rating, setRating] = useState({});
	const [feedback, setFeedback] = useState({});
	const [showModal, setShowModal] = useState(false);

	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/update_and_publish_employee_rating',
		method : 'POST',
	}, { manual: true });

	const onSubmitFinalRating = async () => {
		try {
			const employee_rating_data = Object.keys(rating).map((employee_id) => ({
				employee_id,
				rating   : rating?.[employee_id]?.value,
				comments : feedback?.[employee_id]?.value || '',
			}));

			const payload = {
				employee_rating_data,
				level: props?.activeTab === 'functional_manager' ? 'functional_manager' : props?.level,
			};

			await trigger({ data: payload });
			Toast.success('Ratings updated successfully');
			refetch();
			setShowModal(false);
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	useEffect(() => {
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
	};
};

export default useTableView;
