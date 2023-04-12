import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import getFaqPayload from './getFaqPayload';

function useCreateFaqSet({
	setQuestionPreview,
	editorValue,
	setEditorError,
	RichTextEditor,
	data: apiData,
	showAlias,
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

		const emptyAlias = (showAlias || []).find((alias) => alias?.status !== 'inactive' && !alias?.question_abstract);

		if (emptyAlias) {
			Toast.error('Alias can not be empty');
			return;
		}

		const payload = getFaqPayload({ values, editorValue, source: 'create', data: apiData, showAlias });

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
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	const onClickPublish = async ({ data }) => {
		const { question_aliases = [] } = data || {};
		const updatedAlias = [];

		(question_aliases || []).forEach((alias) => {
			const { id = '' } = alias || {};
			const aliasObj = { id };
			updatedAlias.push(aliasObj);
		});

		const payload = {
			id      : data?.id,
			state   : 'published',
			status  : 'active',
			answers : [{
				state  : 'published',
				status : 'active',
			}],
			aliases: updatedAlias,
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
