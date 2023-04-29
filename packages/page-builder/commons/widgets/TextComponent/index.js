/* eslint-disable max-len */
import { Modal, ButtonIcon } from '@cogoport/components';
import { IcMExpand, IcMMinus } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import 'react-quill/dist/quill.bubble.css';
import textEditorModules from '../../../configurations/text-editor-modules';

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

const iconsMapping = {
	sm         : IcMExpand,
	fullscreen : IcMMinus,
};

function TextComponent(props) {
	const {
		widget,
		pageConfiguration,
		setPageConfiguration,
		childId,
		rowData,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
		selectedItem,
		columnData,
		nestedColumData,
	} = props;

	const [editorModal, setEditorModal] = useState({
		show      : false,
		placement : 'bottom-right',
		size      : 'sm',
	});

	const { component } = widget || {};

	const { content } = component;

	const [editorValue, setEditorValue] = useState(content);

	const handleEditorChange = (value, rowDetails) => {
		const { id } = rowDetails || {};
		const { id: selectedRowId } = selectedRow || {};

		const { id : columnId } = columnData || {};

		const { id : nestedColumnId } = nestedColumData || {};

		const { id: selectedColumnId } = selectedColumn || {};

		const { id: selectedChildId } = selectedItem || {};

		const { id: selectedNestedColumnId } = selectedItem || {};

		const data = pageConfiguration;

		const selectedComponentIndex = (data.layouts || []).findIndex(
			(selectedComponent) => selectedComponent.id === id,
		);

		if (id === selectedRowId && selectedItem) {
			if (Object.keys(selectedNestedColumn).length > 0 && nestedColumnId === selectedNestedColumnId) {
				data.layouts[selectedComponentIndex].component.children[selectedColumnId].component.children[selectedNestedColumnId].component.content = value;
			} else if (Object.keys(selectedColumn).length > 0 && columnId === selectedColumnId) {
				data.layouts[selectedComponentIndex].component.children[selectedChildId].component.content = value;
			} else if (Object.keys(selectedColumn).length === 0 && Object.keys(selectedNestedColumn).length === 0) {
				data.layouts[selectedComponentIndex].component.content = value;
			}
		}

		setEditorValue(value);

		setPageConfiguration((prev) => ({ ...prev, layouts: data.layouts }));
	};

	const Icon = iconsMapping[editorModal.size];

	return (
		<>
			<div
				style={{ cursor: 'pointer' }}
				role="presentation"
				onClick={() => setEditorModal((prev) => ({
					...prev,
					show: true,
				}))}
				dangerouslySetInnerHTML={{ __html: content }}
			/>

			<Modal
				size={editorModal.size}
				placement={editorModal.placement}
				show={editorModal.show}
				onClose={() => setEditorModal((prev) => ({
					...prev,
					show      : false,
					placement : 'bottom-right',
					size      : 'sm',
				}))}
			>
				<Modal.Header title={(
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>Text Editor</div>

						<ButtonIcon
							onClick={() => setEditorModal((prev) => ({
								...prev,
								size: editorModal.size === 'sm' ? 'fullscreen' : 'sm',
							}))}
							style={{ marginRight: '12px' }}
							size="md"
							icon={<Icon />}
							themeType="primary"
						/>

					</div>
				)}
				/>

				<Modal.Body>
					<ReactQuill
						theme="snow"
						placeholder={content || 'start typing'}
						value={editorValue}
						modules={textEditorModules}
						onChange={(val) => handleEditorChange(val, rowData, childId)}
					/>
				</Modal.Body>

				<Modal.Footer />
			</Modal>
		</>
	);
}

export default TextComponent;
