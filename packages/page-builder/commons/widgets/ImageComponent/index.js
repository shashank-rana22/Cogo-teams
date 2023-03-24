function ImageComponent(props) {
	const { src, alt, styles } = props;

	return (
		<div>
			<img style={styles} src={src} alt={alt} />
		</div>
	);
}

export default ImageComponent;
