import styles from './styles.module.css';

function ButtonComponent(props) {
	const {
		widget,
		rowData,
	} = props;

	const { content = 'Click Here', type, attributes } = widget || {};

	const { onClick = () => {} } = attributes || {};

	return (
		<div className={styles.button_wrapper}>
			{/* <Button
				style={rowData.component.buttonStyle}
				type={type}
				themeType={themeType}
				size={size}
				onClick={onClick}
				contentEditable
			>
				{content}
			</Button> */}

			<button
				onClick={onClick}
				type={type}
				style={rowData.component?.buttonStyle}
				contentEditable
			>
				<span>{content}</span>

			</button>

		</div>
	);
}

export default ButtonComponent;
