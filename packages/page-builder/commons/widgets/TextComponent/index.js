import { useState } from 'react';

import useUpdateComponentsContent from '../../../helpers/useUpdateComponentsContent';

import TextEditorModal from './TextEditorModal';

function TextComponent(props) {
	const {
		widget,
		pageConfiguration,
		setPageConfiguration,
		rowData,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
		selectedItem,
		columnData,
		nestedColumData,
		modeType,
	} = props;

	const [editorModal, setEditorModal] = useState({
		show      : false,
		placement : 'bottom-right',
		size      : 'sm',
	});

	const { component } = widget || {};

	const { content } = component;

	const [editorValue, setEditorValue] = useState(content);

	const { handleUpdateContent } = useUpdateComponentsContent({
		pageConfiguration,
		setPageConfiguration,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
		selectedItem,
		columnData,
		nestedColumData,
		setEditorValue,
		type: 'text',
		modeType,
	});

	return (
		<>
			<div
				style={{ cursor: 'pointer' }}
				role="presentation"
				onClick={() => {
					if (modeType === 'edit') {
						setEditorModal((prev) => ({
							...prev,
							show: true,
						}));
					}
				}}
				dangerouslySetInnerHTML={{ __html: content }}
			/>

			<TextEditorModal
				handleUpdateContent={handleUpdateContent}
				editorModal={editorModal}
				setEditorModal={setEditorModal}
				content={content}
				editorValue={editorValue}
				rowData={rowData}
			/>
		</>
	);
}

export default TextComponent;
