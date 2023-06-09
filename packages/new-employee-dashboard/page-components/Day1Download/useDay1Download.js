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
		url    : '/list_company_documents',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			try {
				await listTrigger({
					params: {
						filters: {
							category : 'day_1',
							status   : 'active',
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
	const url = isUpdate ? '/update_company_document' : '/create_company_document';
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
				id            : isUpdate ? data?.list[0]?.id : undefined,
				category      : 'day_1',
				html_template : editorValue.toString('html'),
				name          : 'day 1 download',
				document_type : 'html',
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
		listLoading,
		loading,
	};
};

export default useDay1Download;
