import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useCallback, useEffect } from 'react';

let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require, import/no-unresolved
	RichTextEditor = require('react-rte').default;
}

const useDay1Download = () => {
	const [editorError, setEditorError] = useState(false);
	const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());

	const [{ data, loading: listLoading = false }, listTrigger] = useHarbourRequest({
		method : 'get',
		url    : '/list_document_templates',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			try {
				await listTrigger({
					params: {
						filters: {
							template_type : 'day_1',
							status        : 'active',
						},
					},
				});
			} catch (error) {
				console.log('error :: ', error);
			}
		},
		[listTrigger],
	);

	useEffect(() => {
		fetch();
	}, [fetch]);

	useEffect(() => {
		if (!isEmpty(data?.list)) {
			setEditorValue(
				RichTextEditor?.createValueFromString((data?.list?.[0]?.html_template || ''), 'html'),
			);
		}
	}, [data?.list]);

	const isUpdate = !isEmpty(data?.list);
	const url = isUpdate ? '/update_document_template' : '/create_document_template';
	const [{ loading }, trigger] = useHarbourRequest({
		url,
		method: 'post',
	}, { manual: true });

	const onClickUpdate = async () => {
		const emptyEditorValue = (editorValue.toString('html') === RichTextEditor.createEmptyValue().toString('html'))
		|| (editorValue.toString('html') === '');

		if (emptyEditorValue) {
			setEditorError(true);
			return;
		}

		try {
			const payload = {
				id                : isUpdate ? data?.list[0]?.id : undefined,
				performed_by_id   : 'qwe11e123-asdasd-12312123123qwdads-asdasdqq323',
				performed_by_type : 'agent',
				template_type     : 'day_1',
				html_template     : editorValue.toString('html'),
				name              : 'day 1 download',
			};

			await trigger({
				data: payload,
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	return {
		editorError,
		setEditorError,
		editorValue,
		setEditorValue,
		onClickUpdate,
	};
};

export default useDay1Download;
