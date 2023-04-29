import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function DNDBody({
	activeTab,
	setActiveTab,
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
}) {
	return (
		<section className={styles.body}>
			{modeType === 'edit' && (

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
					selectedNestedColumn={selectedNestedColumn}
				/>

			)}

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
			/>

		</section>
	);
}

export default DNDBody;
