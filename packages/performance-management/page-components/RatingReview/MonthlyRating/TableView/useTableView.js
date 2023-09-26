import { useState } from 'react';

const useTableView = () => {
	const [rating, setRating] = useState({});
	const [feedback, setFeedback] = useState({});

	return {
		rating,
		feedback,
		setRating,
		setFeedback,
	};
};

export default useTableView;
