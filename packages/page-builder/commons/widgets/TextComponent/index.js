import { useState } from 'react';

import 'react-quill/dist/quill.bubble.css';
import useUpdateComponentsContent from '../../../helpers/useUpdateComponentsContent';
import DragPreview from '../../DragPreview';

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

	const { content, isDraggingPreview } = component;

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

	if (isDraggingPreview) {
		return (
			<DragPreview type="text" />
		);
	}

	return (
		<>
			<div
				style={{ cursor: 'pointer' }}
				role="presentation"
				className="ql-editor"
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
