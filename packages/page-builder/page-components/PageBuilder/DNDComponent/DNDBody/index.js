import { useState } from 'react';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function DNDBody({
	pageConfiguration,
	setPageConfiguration,
	addNewItem,
	onNewItemAdding,
	selectedRow,
	setSelectedRow,
	showContentModal,
	setShowContentModal,
	parentComponentId,
	setParentComponentId,
	selectedItem,
	setSelectedItem,
	selectedColumn,
	selectedNestedColumn,
	isNewItemAdding,
	setSelectedColumn,
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
	const [activeTab, setActiveTab] = useState('content');

	return (
		<section className={styles.body}>
			<LeftPanel
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				pageConfiguration={pageConfiguration}
				setPageConfiguration={setPageConfiguration}
				addNewItem={addNewItem}
				onNewItemAdding={onNewItemAdding}
				selectedRow={selectedRow}
				setSelectedRow={setSelectedRow}
				showContentModal={showContentModal}
				setShowContentModal={setShowContentModal}
				parentComponentId={parentComponentId}
				setParentComponentId={setParentComponentId}
				selectedItem={selectedItem}
				setSelectedItem={setSelectedItem}
				selectedColumn={selectedColumn}
				setSelectedColumn={setSelectedColumn}
				selectedNestedColumn={selectedNestedColumn}
				setSelectedNestedColumn={setSelectedNestedColumn}
				modeType={modeType}
			/>
			<RightPanel
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
				modeType={modeType}
				setMode={setMode}
				goBack={goBack}
				goForward={goForward}
				redoUndoIndex={redoUndoIndex}
				lastEventIndex={lastEventIndex}
				setEveryEvents={setEveryEvents}
				handleUnselectItem={handleUnselectItem}
				previewMode={previewMode}
				setPreviewMode={setPreviewMode}
			/>
		</section>
	);
}

export default DNDBody;
