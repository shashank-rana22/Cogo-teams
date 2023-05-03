import DividerPreview from './DividerPreview';

function DividerComponent(props) {
	const { widget } = props;

	const { component } = widget;
	const { style = {}, isDraggingPreview } = component || {};

	if (isDraggingPreview) {
		return (
			<DividerPreview />
		);
	}

	return (
		<div style={style} />
	);
}

export default DividerComponent;
