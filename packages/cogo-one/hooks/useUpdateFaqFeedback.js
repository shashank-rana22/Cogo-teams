import { useRequest } from '@cogoport/request';

const useUpdateFaqFeedback = ({ isLiked, setIsLiked, data = {}, fetch = () => {}, setShow = () => {} }) => {
	const apiName = data?.answers?.[0]?.faq_feedbacks?.[0]?.id
		? '/update_faq_feedback'
		: '/create_faq_feedback';

	const [{ loading: modalLoading }, trigger] = useRequest({
		url    : apiName,
		method : 'post',
	}, { manual: true });

	const onClickLikeDislikeButton = async ({ id, type = '', remarks = '', reason = [] }) => {
		let payload = {};

		if (type === 'like') {
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
			} else {
				payload = {
					faq_answer_id : id,
					is_positive   : true,
					status        : 'active',
				};
			}
		} else if (type === 'dislike') {
			payload = {
				id     : data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
				status : 'inactive',
			};
		} else if (data?.answers?.[0]?.faq_feedbacks?.[0]?.is_positive) {
			payload = {
				id            : data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
				faq_answer_id : data?.answers?.[0]?.id,
				is_positive   : false,
				remark        : `${reason}.${remarks}`,
				status        : 'active',
			};
		} else {
			payload = {
				faq_answer_id : data?.answers?.[0]?.id,
				is_positive   : false,
				remark        : `${reason}.${remarks}`,
				status        : 'active',
			};
		}

		try {
			await trigger({
				data: payload,
			});

			if (type === 'like') {
				setIsLiked(isLiked === 'liked' ? '' : 'liked');
			} else if (type === 'dislike') {
				setIsLiked('');
			} else {
				setIsLiked('disliked');
				setShow(false);
			}
			fetch();
		} catch (error) {
			// console.log(error);
		}
	};

	return {
		onClickLikeDislikeButton,
		modalLoading,
	};
};

export default useUpdateFaqFeedback;
