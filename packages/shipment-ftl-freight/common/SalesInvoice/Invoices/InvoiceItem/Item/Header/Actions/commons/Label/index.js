function Label(props) {
	const { children, required } = props;
	return (
		<>
			<span style={{ color: '#000' }}>{children}</span>
			{' '}
			{required ? <span style={{ color: '#EE3425' }}>*</span> : null}
		</>
	);
}

export default Label;
