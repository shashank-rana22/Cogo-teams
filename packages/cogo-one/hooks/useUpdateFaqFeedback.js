import { useRequest } from '@cogoport/request';

const useUpdateFaqFeedback = ({ isLiked, setIsLiked, data = {}, fetch = () => {} }) => {
	const apiName = data?.answers?.[0]?.faq_feedbacks?.[0]?.id
		? '/update_faq_feedback'
		: '/create_faq_feedback';

	const [{ loading }, trigger] = useRequest({
		url    : apiName,
		method : 'post',
	}, { manual: true });

	const onClickLikeDislikeButton = async ({ id, type = '' }) => {
		if (type === 'like') {
			let payload = {
				faq_answer_id : id,
				is_positive   : true,
				status        : 'active',
			};

			if (isLiked === 'liked') {
				payload = {
					id     : data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
					status : 'inactive',
				};
			} else if (isLiked === 'disliked') {
				payload = {
					id          : data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
					is_positive : true,
					status      : 'active',
				};
			}

			try {
				await trigger({
					data: payload,
				});
				setIsLiked(isLiked === 'liked' ? '' : 'liked');
				fetch();
			} catch (error) {
				// console.log(error);
			}
		} else if (type === 'dislike') {
			try {
				trigger({
					data: {
						id     : data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
						status : 'inactive',
					},
				});

				setIsLiked('');
				fetch();
			} catch (error) {
				// console.log(error);
			}
		}
	};

	return {
		onClickLikeDislikeButton,
	};
};

export default useUpdateFaqFeedback;
