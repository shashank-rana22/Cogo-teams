
function Icon(props, ref) {
	const { type, ...rest } = props;

	const { style = {} } = rest || {};

	const CurrentIcon = type;

	return CurrentIcon ? (
		<CurrentIcon style={style} className="fade-in" ref={ref} {...rest} />
	) : null;
}


export default Icon;
