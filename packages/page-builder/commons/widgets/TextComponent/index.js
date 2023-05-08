import { IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import 'react-quill/dist/quill.bubble.css';
import useUpdateComponentsContent from '../../../helpers/useUpdateComponentsContent';
import DragPreview from '../../DragPreview';

import styles from './styles.module.css';
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
		<div className={styles.block_wrapper}>
			<div
				style={{ cursor: 'pointer' }}
				className="ql-editor"
				dangerouslySetInnerHTML={{ __html: content }}
			/>

			{modeType === 'edit' && (
				<div className={styles.show_wrapper}>
					<IcMEdit
						height="15px"
						width="15px"
						fill="#ffffff"
						cursor="pointer"
						onClick={() => {
							if (modeType === 'edit') {
								setEditorModal((prev) => ({
									...prev,
									show: true,
								}));
							}
						}}
					/>
				</div>
			)}

			<TextEditorModal
				handleUpdateContent={handleUpdateContent}
				editorModal={editorModal}
				setEditorModal={setEditorModal}
				content={content}
				editorValue={editorValue}
				rowData={rowData}
			/>
		</div>
	);
}

export default TextComponent;
