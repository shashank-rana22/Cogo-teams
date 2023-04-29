/* eslint-disable import/no-cycle */
import ButtonComponent from '../../../../../../../../commons/widgets/ButtonComponent';
import CarouselComponent from '../../../../../../../../commons/widgets/CarouselComponent';
import DividerComponent from '../../../../../../../../commons/widgets/DividerComponent';
import FormComponent from '../../../../../../../../commons/widgets/FormComponent';
import HtmlComponent from '../../../../../../../../commons/widgets/HtmlComponent';
import ImageComponent from '../../../../../../../../commons/widgets/ImageComponent';
import TextComponent from '../../../../../../../../commons/widgets/TextComponent';
import VideoComponent from '../../../../../../../../commons/widgets/VideoComponent';

const componentMapping = {
	text     : TextComponent,
	button   : ButtonComponent,
	image    : ImageComponent,
	video    : VideoComponent,
	html     : HtmlComponent,
	form     : FormComponent,
	carousel : CarouselComponent,
	divider  : DividerComponent,
};

function RenderComponent({
	componentType,
	widget,
	rowData,
	pageConfiguration,
	setPageConfiguration,
	elementId,
	childId,
	setSelectedItem,
	// index,
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
}) {
	console.log('didjf', childId);

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
		},

		button: {
			widget,
			pageConfiguration,
			setPageConfiguration,
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
		},

		divider: {
			key: elementId,
			widget,
			pageConfiguration,
			setPageConfiguration,
			childId,
			elementId,

		},
	};

	const Component = componentMapping[componentType];

	const handleClick = (e) => {
		e.stopPropagation();
		setSelectedRow({ ...rowData });
		setSelectedColumn({ ...columnData });
		setSelectedNestedColumn({ ...nestedColumData });
		setSelectedItem({ ...widget });
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

export default RenderComponent;
