/* eslint-disable max-len */
import { isEmpty } from '@cogoport/utils';

import RenderComponent from '../RenderComponent';

import styles from './styles.module.css';

function ColumnComponents({
	widget,
	pageConfiguration,
	setPageConfiguration,
	rowData,
	setSelectedItem,
	setParentComponentId,
	setShowContentModal,
	setSelectedRow,
	setSelectedColumn,
	setSelectedNestedColumn,
	selectedItem,
	selectedRow,
	selectedColumn,
	selectedNestedColumn,
}) {
	const { id: componentId, component } = widget || {};

	const { children, style } = component || {};

	const { id: columnChildId } = selectedColumn || {};

	const { id: selectedRowId } = selectedRow || {};

	const { id: nestedColumnId } = selectedNestedColumn || {};

	if (isEmpty(children)) {
		return (
			<div className={styles.block_wrapper}>
				<div className={styles.loader_text}>
					Drop here to add blocks
				</div>
			</div>
		);
	}

	const handleClick = (e, columnData) => {
		e.stopPropagation();
		setSelectedRow({ ...rowData });
		setSelectedColumn({ ...columnData });
		setSelectedNestedColumn({});
		setSelectedItem({});
	};

	const handleNestedClick = (e, columnData, nestedData) => {
		e.stopPropagation();
		setSelectedRow({ ...rowData });
		setSelectedColumn({ ...columnData });
		setSelectedNestedColumn({ ...nestedData });
		setSelectedItem({});
	};

	return (
		<div style={style}>

			{ (children || []).map((childComponent, idx) => {
				const {
					id,
					component: childrenComponent,
				} = childComponent || {};

				const {
					attributes,
					type,
					children: childChildren,
					style: allStyles,
					icon,
				} = childrenComponent || {};

				const isChildSelected = columnChildId === id && componentId === selectedRowId;
				const border = isChildSelected ? '5px solid green' : allStyles.border;

				if (!isEmpty(childChildren) && ['container', 'card', 'formSample'].includes(type)) {
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

								const isNestedChildSelected = columnChildId === id && componentId === selectedRowId && childrenId === nestedColumnId;

								const nestedBorder = isNestedChildSelected ? '5px solid yellow' : allStyles.border;

								return (

									<div
										role="presentation"
										className={styles.content_container}
										style={{ ...childrenStyles, border: nestedBorder }}
										onClick={(e) => handleNestedClick(e, childComponent, nestedChildren)}
									>
										<RenderComponent
											componentType={childrenType}
											widget={nestedChildren}
											pageConfiguration={pageConfiguration}
											setPageConfiguration={setPageConfiguration}
											elementId={childrenId}
											childId={childrenId}
											// selectedRow={selectedRow}
											setSelectedItem={setSelectedItem}
											index={childrenIndex}
											// setChildId={setChildId}
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

				return (

					<div
						role="presentation"
						className={styles.content_container}
						style={{ ...(type === 'divider' ? {} : allStyles), border }}
						onClick={(e) => handleClick(e, childComponent)}
					>

						{!type ? (
							<div
								role="presentation"
								onClick={attributes.onClick}
							>
								{icon}
							</div>
						) : (
							<RenderComponent
								componentType={type}
								widget={childComponent}
								pageConfiguration={pageConfiguration}
								setPageConfiguration={setPageConfiguration}
								elementId={id}
								childId={id}
								// selectedRow={selectedRow}
								setSelectedItem={setSelectedItem}
								index={idx}
								// setChildId={setChildId}
								setParentComponentId={setParentComponentId}
								setShowContentModal={setShowContentModal}
								rowData={rowData}
								columnData={childComponent}
								setSelectedRow={setSelectedRow}
								setSelectedColumn={setSelectedColumn}
								setSelectedNestedColumn={setSelectedNestedColumn}
								nestedColumData={{}}
								selectedItem={selectedItem}
								selectedRow={selectedRow}
								selectedColumn={selectedColumn}
								selectedNestedColumn={selectedNestedColumn}
							/>
						) }
					</div>
				);
			})}
		</div>
	);
}

export default ColumnComponents;
