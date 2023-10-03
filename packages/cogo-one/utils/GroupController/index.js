import {
	SelectController,
	InputNumberController,
} from '@cogoport/forms';

import styles from './styles.module.css';

const CONTROLS_MAPPING = {
	number : InputNumberController,
	select : SelectController,
};

function GroupController({
	control = {},
	name = '',
	...rest
}) {
	const { inputControls = [], rules, value } = rest || {};

	return (
		<div className={styles.container}>
			{(inputControls || []).map((eachControl) => {
				const { controlType = '' } = eachControl || {};

				const Element = CONTROLS_MAPPING[controlType] || null;

				if (!Element) {
					return null;
				}

				return (
					<Element
						{...eachControl}
						key={name}
						control={control}
						defaultValue={value}
						rules={rules}
					/>
				);
			})}
		</div>
	);
}

export default GroupController;
