import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import useCreateFaqPayload from './useCreateFaqPayload';

function useCreateFaqSet({
	setQuestionPreview,
	editorValue,
	setEditorError,
	RichTextEditor,
	data: apiData,
}) {
	const router = useRouter();
	const {
		general,
	} = useSelector((state) => state);

	const { id: questionId } = general.query || {};

	const apiName = questionId
		? '/update_question_answer_set'
		: '/create_question_answer_set';

	const [{ loading = false }, trigger] = useRequest({
		url    : apiName,
		method : 'POST',
	}, { manual: true });

	const onSubmit = async (values) => {
		const emptyEditorValue = (editorValue.toString('html') === RichTextEditor.createEmptyValue().toString('html'))
		|| (editorValue.toString('html') === '');

		if (emptyEditorValue) {
			setEditorError(true);
			return;
		}

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { payload } = useCreateFaqPayload({ values, editorValue, source: 'create', apiData });

		try {
			const res = await trigger({
				data: { ...payload, id: questionId },
			});

			if (res?.data) {
				const id = res?.data?.id;

				Toast.success('Question saved as draft');

				const href = `/learning/faq/create/question?mode=preview&id=${id}`;
				router.push(href, href);

				setQuestionPreview('preview');
			}
		} catch (err) {
			console.log('err', err);
		}
	};

	const onClickPublish = async ({ data }) => {
		const audience_ids = (data?.answers?.[0]?.faq_audiences || []).map(
			(audience) => audience?.id,
		);

		const payload = {
			id      : data?.id,
			state   : 'published',
			status  : 'active',
			answers : [{
				state  : 'published',
				status : 'active',
				id     : data?.answers?.[0]?.id,
				audience_ids,
			}],
		};

		try {
			const res = await trigger({
				data: payload,
			});

			if (res?.data) {
				Toast.success('Questions Published sucessfully');

				const href = '/learning';
				router.push(href, href);
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
