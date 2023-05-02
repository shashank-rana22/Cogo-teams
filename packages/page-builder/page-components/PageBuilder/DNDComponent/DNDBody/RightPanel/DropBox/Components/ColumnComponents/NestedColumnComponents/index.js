import RenderElement from '../../RenderElement';

import styles from './styles.module.css';

function NestedColumnComponent({
	pageConfiguration,
	setPageConfiguration,
	childrenComponent,
	border,
	childComponent,
	rowData,
	selectedColumn,
	setSelectedColumn,
	setSelectedRow,
	setSelectedNestedColumn,
	setSelectedItem,
	selectedItem,
	selectedRow,
	selectedNestedColumn,
	setParentComponentId,
	setShowContentModal,
	handleClick,
	componentId,
	id,
	modeType,
}) {
	const {
		children: childChildren,
		style: allStyles,
	} = childrenComponent || {};

	const { id: columnChildId } = selectedColumn || {};

	const { id: selectedRowId } = selectedRow || {};

	const { id: nestedColumnId } = selectedNestedColumn || {};

	const handleNesteColumnClick = (e, columnData, nestedData) => {
		if (modeType === 'edit') {
			e.stopPropagation();
			setSelectedRow({ ...rowData });
			setSelectedColumn({ ...columnData });
			setSelectedNestedColumn({ ...nestedData });
			setSelectedItem({});
		}
	};

	return (
		<div
			role="presentation"
			className={styles.content_container}
			onClick={(e) => handleClick(e, childComponent)}
			style={{ ...allStyles, display: 'block', border, padding: '16px' }}
		>
			{ (childChildren || []).map((nestedChildren, childrenIndex) => {
				const {
					id: childrenId,
					component: nestedChildrenComponent,
				} = nestedChildren || {};

				const {
					style: childrenStyles,
					type: childrenType,
				} = nestedChildrenComponent || {};

				const isNestedChildSelected = columnChildId === id
                && componentId === selectedRowId
                && childrenId === nestedColumnId;

				const nestedBorder = isNestedChildSelected ? '1px solid yellow' : allStyles.border;

				return (

					<div
						role="presentation"
						className={styles.content_container}
						style={{ ...childrenStyles, border: nestedBorder }}
						onClick={(e) => handleNesteColumnClick(e, childComponent, nestedChildren)}
					>
						<RenderElement
							componentType={childrenType}
							widget={nestedChildren}
							pageConfiguration={pageConfiguration}
							setPageConfiguration={setPageConfiguration}
							elementId={childrenId}
							childId={childrenId}
							setSelectedItem={setSelectedItem}
							index={childrenIndex}
							setParentComponentId={setParentComponentId}
							setShowContentModal={setShowContentModal}
							rowData={rowData}
							columnData={childComponent}
							setSelectedRow={setSelectedRow}
							setSelectedColumn={setSelectedColumn}
							setSelectedNestedColumn={setSelectedNestedColumn}
							nestedColumData={nestedChildren}
							selectedItem={selectedItem}
							selectedRow={selectedRow}
							selectedColumn={selectedColumn}
							selectedNestedColumn={selectedNestedColumn}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default NestedColumnComponent;
