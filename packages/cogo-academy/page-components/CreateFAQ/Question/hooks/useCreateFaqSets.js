import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import useCreateFaqPayload from './useCreateFaqPayload';

function useCreateFaqSet({ setQuestionPreview, editorValue }) {
	const router = useRouter();
	const {
		general,
	} = useSelector((state) => state);

	const { id: questionId } = general.query || {};

	const apiName = questionId ? '/update_question_answer_set' : '/create_question_answer_set';

	const [{ loading = false }, trigger] = useRequest({
		url    : apiName,
		method : 'POST',
	}, { manual: true });

	const onSubmit = async (values) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { payload } = useCreateFaqPayload({ values, editorValue });

		try {
			const res = await trigger({
				data: payload,
			});

			if (res?.data) {
				const id = res?.data?.id;

				Toast.success('question created sucessfully');

				const href = `/learning/faq/create/question?mode=preview&id=${id}`;

				router.push(href, href);

				setQuestionPreview('preview');
			}
		} catch (err) {
			console.log('err', err);
		}
	};

	const onClickPublish = async ({ data }) => {
		const payload = {
			id     : data?.id,
			state  : 'published',
			status : 'active',
		};

		try {
			const res = await trigger({
				data: payload,
			});

			if (res?.data) {
				Toast.success('questions Published sucessfully');

				const href = '/learning/faq/create';
				router.push(href, href);

				// setQuestionPreview('preview');
			}
		} catch (err) {
			console.log('err', err);
		}
	};

	return {
		onSubmit,
		loading,
		onClickPublish,
	};
}

export default useCreateFaqSet;
