import { Modal } from '@cogoport/components';

import Content from '../DNDBody/LeftPanel/Content';

function SelectComponentModal({
	parentComponentId,
	addNewItem,
	onNewItemAdding,
	selectedRow,
	selectedItem,
	setParentComponentId,
	setShowContentModal,
	pageConfiguration,
	setPageConfiguration,
	selectedColumn,
	selectedNestedColumn,
	showContentModal,
}) {
	const onClose = () => {
		setShowContentModal(false);
	};

	return (
		<section>
			<Modal
				size="md"
				show={showContentModal}
				onClose={onClose}
				placement="top"
				scroll={false}
			>
				<Modal.Header title="choose content" />
				<Content
					parentComponentId={parentComponentId}
					addNewItem={addNewItem}
					onNewItemAdding={onNewItemAdding}
					selectedRow={selectedRow}
					dropSource="selectBox"
					selectedItem={selectedItem}
					setParentComponentId={setParentComponentId}
					setShowContentModal={setShowContentModal}
					pageConfiguration={pageConfiguration}
					setPageConfiguration={setPageConfiguration}
					selectedColumn={selectedColumn}
					selectedNestedColumn={selectedNestedColumn}
				/>
			</Modal>
		</section>
	);
}

export default SelectComponentModal;
