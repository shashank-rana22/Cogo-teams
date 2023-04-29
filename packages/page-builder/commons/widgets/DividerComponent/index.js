function DividerComponent(props) {
	const { widget } = props;

	const { component } = widget;
	const { style = {} } = component || {};

	return (
		<div style={style} />
	);
}

export default DividerComponent;
