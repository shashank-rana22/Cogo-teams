import DragPreview from '../../DragPreview';

function DividerComponent(props) {
	const { widget } = props;

	const { component } = widget;
	const { style = {}, isDraggingPreview } = component || {};

	if (isDraggingPreview) {
		return (
			<DragPreview type="divider" />
		);
	}

	return (
		<div style={style} />
	);
}

export default DividerComponent;
