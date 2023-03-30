import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import useCreateFaqPayload from './useCreateFaqPayload';

function useUpdateFaqSet({
	setQuestionPreview,
	editorValue,
	data,
	RichTextEditor,
	setEditorError,
}) {
	const router = useRouter();

	const {
		general,
	} = useSelector((state) => state);

	const { id } = general.query || {};

	const [{ loading = false }, trigger] = useRequest({
		url    : '/update_question_answer_set',
		method : 'POST',
	}, { manual: true });

	const onSubmitUpdatedForm = async (values) => {
		const emptyEditorValue = editorValue.toString('html') === RichTextEditor.createEmptyValue().toString('html');

		if (emptyEditorValue) {
			setEditorError(true);
			return;
		}
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { payload } = useCreateFaqPayload({ values, editorValue, data });

		try {
			const res = await trigger({
				data: { ...payload, id },
			});

			if (res?.data) {
				Toast.success('Question saved as draft sucessfully');

				const href = `/learning/faq/create/question?mode=preview&id=${id}`;

				router.push(href, href);

				setQuestionPreview('preview');
			}
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	return {
		onSubmitUpdatedForm,
		loading,

	};
}

export default useUpdateFaqSet;
