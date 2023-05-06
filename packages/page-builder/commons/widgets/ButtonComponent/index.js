import { Button } from '@cogoport/components';

import DragPreview from '../../DragPreview';

import styles from './styles.module.css';

function ButtonComponent(props) {
	const {
		widget,
		rowData,
	} = props;

	const {
		content = 'Click Here',
		themeType = 'primary',
		size = 'md',
		type,
		attributes,
		component,
	} = widget || {};

	const { isDraggingPreview } = component;

	const { onClick = () => { } } = attributes || {};

	if (isDraggingPreview) {
		return (
			<DragPreview showBackDrop={false} type="button" />
		);
	}

	return (
		<div className={styles.button_wrapper} contentEditable>
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
