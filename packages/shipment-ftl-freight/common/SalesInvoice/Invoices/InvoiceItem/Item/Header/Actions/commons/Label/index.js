function Label({ children, required }) {
	return (
		<>
			<span style={{ color: '#000' }}>{children}</span>
			&nbsp;
			{required ? <span style={{ color: '#000' }}>*</span> : null}
		</>
	);
}

export default Label;
