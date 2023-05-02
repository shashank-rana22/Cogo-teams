import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ButtonComponent(props) {
	const {
		widget,
		rowData,
	} = props;

	const { content = 'Click Here', themeType, size, type, attributes } = widget || {};

	const { onClick = () => {} } = attributes || {};

	return (
		<div className={styles.button_wrapper}>
			<Button
				style={rowData.component.buttonStyle}
				type={type}
				themeType={themeType}
				size={size}
				onClick={onClick}
				contentEditable
			>
				{content}
			</Button>

		</div>
	);
}

export default ButtonComponent;
