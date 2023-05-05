/* eslint-disable import/no-cycle */
// import ComponentsDropPreview from '../../../../../../../../commons/ComponentsDropPreview';
import ColumnComponents from '../ColumnComponents';
import RenderElement from '../RenderElement';

function RenderComponent({
	rowData,
	pageConfiguration,
	setPageConfiguration,
	setParentComponentId,
	setShowContentModal,
	selectedItem,
	setSelectedItem,
	selectedRow,
	setSelectedRow,
	selectedColumn,
	setSelectedColumn,
	selectedNestedColumn,
	setSelectedNestedColumn,
	elementId,
	index,
	type,
	// isDraggingPreview,
	previewMode,
	modeType,
	isMobile,
}) {
	// if (isDraggingPreview) {
	// 	return <ComponentsDropPreview type={type} />;
	// }

	return (
		<div>
			{['container', 'card', 'formSample'].includes(type)
				? (
					<ColumnComponents
						widget={rowData}
						rowData={rowData}
						pageConfiguration={pageConfiguration}
						setPageConfiguration={setPageConfiguration}
						setParentComponentId={setParentComponentId}
						setShowContentModal={setShowContentModal}
						selectedItem={selectedItem}
						setSelectedItem={setSelectedItem}
						selectedRow={selectedRow}
						setSelectedRow={setSelectedRow}
						selectedColumn={selectedColumn}
						setSelectedColumn={setSelectedColumn}
						selectedNestedColumn={selectedNestedColumn}
						setSelectedNestedColumn={setSelectedNestedColumn}
						modeType={modeType}
						previewMode={previewMode}
						isMobile={isMobile}
					/>
				)
				: (
					<div
						style={{
							...(type === 'divider'
								? {} : rowData.component.style),
						}}
					>
						<RenderElement
							componentType={type}
							widget={rowData}
							rowData={rowData}
							pageConfiguration={pageConfiguration}
							setPageConfiguration={setPageConfiguration}
							elementId={elementId}
							index={index}
							setParentComponentId={setParentComponentId}
							setShowContentModal={setShowContentModal}
							columnData={{}}
							selectedItem={selectedItem}
							setSelectedItem={setSelectedItem}
							selectedRow={selectedRow}
							setSelectedRow={setSelectedRow}
							selectedColumn={selectedColumn}
							setSelectedColumn={setSelectedColumn}
							selectedNestedColumn={selectedNestedColumn}
							setSelectedNestedColumn={setSelectedNestedColumn}
							modeType={modeType}
						/>
					</div>
				)}
		</div>
	);
}

export default RenderComponent;
