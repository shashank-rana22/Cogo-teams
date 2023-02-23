import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import useCreateFaqPayload from './useCreateFaqPayload';

function useCreateFaqSet({ setQuestionPreview, editorValue }) {
	const router = useRouter();

	const [{ loading = false }, trigger] = useRequest({
		url    : 'create_question_answer_set',
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
				Toast.success('questions created sucessfully');
				router.push(
					`/learning/faq/create/question?mode=preview&id=${id}`,
					`/learning/faq/create/question?mode=preview&id=${id}`,
				);
				setQuestionPreview('preview');
			}
		} catch (err) {
			console.log('err', err);
		}
	};

	return { onSubmit, loading };
}

export default useCreateFaqSet;
