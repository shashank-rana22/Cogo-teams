import { Modal, ButtonIcon } from '@cogoport/components';
import { IcMExpand, IcMMinus } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';

import 'react-quill/dist/quill.bubble.css';
import textEditorModules from '../../../../configurations/text-editor-modules';

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

const iconsMapping = {
	sm         : IcMExpand,
	fullscreen : IcMMinus,
};

function TextEditorModal({
	handleUpdateContent,
	editorModal,
	setEditorModal,
	content,
	editorValue,
	rowData,
}) {
	const Icon = iconsMapping[editorModal.size];
	return (
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
					onChange={(val) => handleUpdateContent(val, rowData)}
				/>
			</Modal.Body>
			<Modal.Footer />

		</Modal>
	);
}

export default TextEditorModal;
