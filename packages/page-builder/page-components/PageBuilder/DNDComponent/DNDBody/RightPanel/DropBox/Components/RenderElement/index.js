/* eslint-disable import/no-cycle */
import COMPONENT_MAPPING from '../../../../../../../../configurations/components-mapping';

function RenderElement({
	componentType,
	widget,
	rowData,
	pageConfiguration,
	setPageConfiguration,
	elementId,
	childId,
	setSelectedItem,
	setParentComponentId,
	setShowContentModal,
	setSelectedRow,
	setSelectedColumn,
	columnData,
	setSelectedNestedColumn,
	nestedColumData,
	selectedItem,
	selectedRow,
	selectedColumn,
	selectedNestedColumn,
	modeType,
}) {
	const componentPropsMapping = {
		text: {
			widget,
			pageConfiguration,
			setPageConfiguration,
			childId,
			rowData,
			selectedRow,
			selectedColumn,
			selectedNestedColumn,
			selectedItem,
			columnData,
			nestedColumData,
			modeType,
		},

		image: {
			widget,
			pageConfiguration,
			setPageConfiguration,
			childId,
			rowData,
			selectedRow,
			selectedColumn,
			selectedNestedColumn,
			selectedItem,
			columnData,
			nestedColumData,
			modeType,
		},

		button: {
			widget,
			pageConfiguration,
			setPageConfiguration,
			modeType,
		},

		video: {
			widget,
			pageConfiguration,
			setPageConfiguration,
			childId,
			rowData,
			selectedRow,
			selectedColumn,
			selectedNestedColumn,
			selectedItem,
			columnData,
			nestedColumData,
			modeType,
		},

		html: {
			widget,
		},

		form: {
			pageConfiguration,
			setPageConfiguration,
			childId,
			widget,
			rowData,
			selectedRow,
			selectedColumn,
			selectedNestedColumn,
			selectedItem,
			columnData,
			nestedColumData,
			modeType,
		},

		carousel: {
			widget,
			pageConfiguration,
			setPageConfiguration,
			setSelectedItem,
			childId,
			setParentComponentId,
			setShowContentModal,
			rowData,
			setSelectedRow,
			setSelectedColumn,
			columnData,
			setSelectedNestedColumn,
			nestedColumData,
			selectedItem,
			selectedRow,
			selectedColumn,
			selectedNestedColumn,
			modeType,
		},

		divider: {
			key: elementId,
			widget,
			pageConfiguration,
			setPageConfiguration,
			childId,
			elementId,
			modeType,

		},
	};

	const Component = COMPONENT_MAPPING[componentType];

	const handleClick = (e) => {
		if (modeType === 'edit') {
			e.stopPropagation();
			setSelectedRow({ ...rowData });
			setSelectedColumn({ ...columnData });
			setSelectedNestedColumn({ ...nestedColumData });
			setSelectedItem({ ...widget });
		}
	};

	// const { id: columnChildId } = selectedColumn || {};

	// const { id: selectedRowId } = selectedRow || {};

	// const { id: nestedColumnId } = selectedNestedColumn || {};

	const border = widget.id === selectedItem.id ? '5px solid blue' : '';

	return (
		<div
			key={elementId}
			role="presentation"
			onClick={(e) => {
				handleClick(e);
			}}
			style={{ width: '100%', height: '100%', border }}
		>
			<Component key={componentType} {...(componentPropsMapping[componentType] || {})} />
		</div>
	);
}

export default RenderElement;
