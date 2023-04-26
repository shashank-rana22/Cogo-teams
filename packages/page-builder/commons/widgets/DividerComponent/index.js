function DividerComponent(props) {
	const { widget } = props;

	const { style = {} } = widget;
	return (

		<div style={style} />

	);
}

export default DividerComponent;
