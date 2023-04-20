import { Input } from '@cogoport/components';

import styles from './styles.module.css';

function ColorInput(props) {
	const {
		colorKey,
		component,
		selectedItem,
		isRootComponent,
		handleChange,
	} = props;

	const color = isRootComponent ? component.style?.[colorKey] : selectedItem.style?.[colorKey];

	return (
		<div className={styles.color_input}>
			<div className={styles.color_panel}>
				<Input
					className={`${styles.color_input} ${styles.ui_input_container}`}
					size="sm"
					type="color"
					value={color || '#ffffff'}
					onChange={(value) => handleChange(colorKey, value)}
				/>
			</div>
			<div>
				<Input
					className={styles.hex_input}
					size="sm"
					type="text"
					value={color || '#ffffff'}
					placeholder="Small"
					onChange={(value) => handleChange(colorKey, value)}
				/>
			</div>
		</div>
	);
}
export default ColorInput;
