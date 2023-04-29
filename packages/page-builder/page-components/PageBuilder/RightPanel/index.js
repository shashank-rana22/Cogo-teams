import DropBox from './DropBox';
import Header from './Header';
import styles from './styles.module.css';

function RightPanel({
	pageConfiguration,
	setPageConfiguration,
	addNewItem,
	onNewItemAdding,
	isNewItemAdding,
	parentComponentId,
	setShowContentModal,
	setParentComponentId,
	selectedRow,
	setSelectedRow,
	selectedItem,
	setSelectedItem,
	selectedColumn,
	setSelectedColumn,
	selectedNestedColumn,
	setSelectedNestedColumn,
	modeType,
	setMode,
}) {
	return (
		<div className={styles.right_panel} style={{ width: modeType === 'edit' ? '70%' : '100%' }}>
			<Header modeType={modeType} setMode={setMode} setSelectedRow={setSelectedRow} />
			<div>
				<DropBox
					pageConfiguration={pageConfiguration}
					setPageConfiguration={setPageConfiguration}
					addNewItem={addNewItem}
					onNewItemAdding={onNewItemAdding}
					isNewItemAdding={isNewItemAdding}
					parentComponentId={parentComponentId}
					setShowContentModal={setShowContentModal}
					setParentComponentId={setParentComponentId}
					selectedRow={selectedRow}
					setSelectedRow={setSelectedRow}
					selectedItem={selectedItem}
					setSelectedItem={setSelectedItem}
					selectedColumn={selectedColumn}
					setSelectedColumn={setSelectedColumn}
					selectedNestedColumn={selectedNestedColumn}
					setSelectedNestedColumn={setSelectedNestedColumn}
				/>
			</div>
		</div>
	);
}

export default RightPanel;
