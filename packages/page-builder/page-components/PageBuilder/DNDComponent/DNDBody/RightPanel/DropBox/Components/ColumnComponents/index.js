/* eslint-disable max-len */
import { isEmpty } from '@cogoport/utils';

import RenderElement from '../RenderElement';

import NestedColumnComponent from './NestedColumnComponents';
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
	modeType,
	previewMode,
	isMobile,
}) {
	const { id: componentId, component } = widget || {};

	const { children, style } = component || {};

	const modifiedParentStyle = {
		...style,
		...((isMobile || previewMode === 'mobile') && {
			flexDirection: 'column',
		}),
	};

	const { id: columnChildId } = selectedColumn || {};

	const { id: selectedRowId } = selectedRow || {};

	if (isEmpty(children)) {
		return (
			<div className={styles.block_wrapper}>
				<img
					alt=""
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/svgviewer-png-output%20(14).png"
					width="78px"
					height="78px"
				/>
				<div className={styles.block_text}>
					Drop here to add blocks
				</div>
			</div>
		);
	}

	const handleClick = (e, columnData) => {
		if (modeType === 'edit') {
			e.stopPropagation();
			setSelectedRow({ ...rowData });
			setSelectedColumn({ ...columnData });
			setSelectedNestedColumn({});
			setSelectedItem({});
		}
	};

	return (
		<div style={modifiedParentStyle}>

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

				const { onClick } = attributes || {};

				const modifiedStyle = {
					...allStyles,
					...((isMobile || previewMode === 'mobile') && {
						width: '100%',
					}),
					...(type && {
						border: '1px solid transparent',
					}),
				};

				const isChildSelected = columnChildId === id && componentId === selectedRowId;

				const border = isChildSelected ? '1px solid green' : modifiedStyle.border;

				if (!isEmpty(childChildren) && ['container', 'card', 'formSample'].includes(type)) {
					return (
						<NestedColumnComponent
							pageConfiguration={pageConfiguration}
							setPageConfiguration={setPageConfiguration}
							childrenComponent={childrenComponent}
							border={border}
							childComponent={childComponent}
							rowData={rowData}
							selectedColumn={selectedColumn}
							setSelectedColumn={setSelectedColumn}
							selectedRow={selectedRow}
							setSelectedRow={setSelectedRow}
							selectedNestedColumn={selectedNestedColumn}
							setSelectedNestedColumn={setSelectedNestedColumn}
							selectedItem={selectedItem}
							setSelectedItem={setSelectedItem}
							setParentComponentId={setParentComponentId}
							setShowContentModal={setShowContentModal}
							handleClick={handleClick}
							componentId={componentId}
							id={id}
							previewMode={previewMode}
							isMobile={isMobile}
							modeType={modeType}
						/>
					);
				}

				return (

					<div
						role="presentation"
						className={modeType === 'edit' && styles.content_container}
						style={{ ...(type === 'divider' ? {} : modifiedStyle), border }}
						onClick={(e) => handleClick(e, childComponent)}
					>

						{!type ? (
							<div
								role="presentation"
								onClick={() => { if (modeType === 'edit') { onClick(); } }}
							>
								{icon}
							</div>
						) : (
							<RenderElement
								componentType={type}
								widget={childComponent}
								pageConfiguration={pageConfiguration}
								setPageConfiguration={setPageConfiguration}
								elementId={id}
								childId={id}
								index={idx}
								setParentComponentId={setParentComponentId}
								setShowContentModal={setShowContentModal}
								rowData={rowData}
								columnData={childComponent}
								nestedColumData={{}}
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
						) }
					</div>
				);
			})}
		</div>
	);
}

export default ColumnComponents;
