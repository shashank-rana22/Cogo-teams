import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ButtonComponent(props) {
	const {
		widget,
	} = props;

	const { content = 'Click Here', themeType, size, type, attributes } = widget || {};

	const { onClick = () => {} } = attributes || {};

	return (
		<div className={styles.button_wrapper}>
			<Button
				type={type}
				themeType={themeType}
				size={size}
				onClick={onClick}
			>
				{content}
			</Button>
		</div>
	);
}

export default ButtonComponent;
