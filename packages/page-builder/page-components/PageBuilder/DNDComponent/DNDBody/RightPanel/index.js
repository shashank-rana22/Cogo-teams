import DropBox from './DropBox';
import Header from './Header';
import MobileView from './MobileView';
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
	redoUndoIndex,
	lastEventIndex,
	setEveryEvents,
	goBack,
	goForward,
	handleUnselectItem,
	previewMode,
	setPreviewMode,
}) {
	return (
		<div className={styles.right_panel} style={{ width: modeType === 'edit' ? '70%' : '100%' }}>
			<Header
				modeType={modeType}
				setMode={setMode}
				pageConfiguration={pageConfiguration}
				handleUnselectItem={handleUnselectItem}
				redoUndoIndex={redoUndoIndex}
				lastEventIndex={lastEventIndex}
				setEveryEvents={setEveryEvents}
				goBack={goBack}
				goForward={goForward}
				setPreviewMode={setPreviewMode}
			/>

			{previewMode === 'mobile' ? (
				<MobileView
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
					handleUnselectItem={handleUnselectItem}
					modeType={modeType}
				/>
			) : (
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
					handleUnselectItem={handleUnselectItem}
					modeType={modeType}
				/>
			)}

			<div />
		</div>
	);
}

export default RightPanel;
