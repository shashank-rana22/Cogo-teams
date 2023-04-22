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
	const { widget, components, setComponents, childId, selectedRow } = props;

	const [editorModal, setEditorModal] = useState({
		show      : false,
		placement : 'bottom-right',
		size      : 'sm',
	});

	const { content } = widget || {};

	const [editorValue, setEditorValue] = useState(content);

	const handleEditorChange = (value) => {
		const { parentId, id } = selectedRow || {};

		const data = components;

		const selectedComponentIndex = (data.layouts || []).findIndex(
			(component) => component.id === id,
		);

		if (parentId && childId) {
			data.layouts[selectedComponentIndex].children[childId].content = value;
		} else {
			data.layouts[selectedComponentIndex].content = value;
		}

		setEditorValue(value);
		setComponents((prev) => ({ ...prev, layouts: data.layouts }));
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
						onChange={handleEditorChange}
					/>
				</Modal.Body>

				<Modal.Footer />
			</Modal>
		</>
	);
}

export default TextComponent;
