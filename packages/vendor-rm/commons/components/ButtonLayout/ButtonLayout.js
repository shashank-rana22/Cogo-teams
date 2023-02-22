import { Button } from '@cogoport/components';

// eslint-disable-next-line import/no-cycle
import COMPONENT_MAPPING from '../../../utils/component-mapping';

import styles from './styles.module.css';

function ButtonLayout({
	activeStepper = {},
	setActiveStepper = () => {},
	loading = false,
	handleSubmit = () => {},
	onSubmit = () => {},
	style = {},
}) {
	const { step } = COMPONENT_MAPPING.find((item) => item.key === activeStepper);

	const showCancelButton = step !== 1;

	const showProceedButton = step <= 4;

	const onClickCancelButton = () => {
		setActiveStepper(COMPONENT_MAPPING[step - 2].key);
	};

	return (
		<div className={styles.button_container} style={style}>
			{showCancelButton && (
				<Button
					size="lg"
					themeType="tertiary"
					style={{ marginRight: 20 }}
					disabled={loading}
					onClick={onClickCancelButton}
				>
					Back
				</Button>
			)}

			{showProceedButton ? (
				<Button
					size="lg"
					themeType="accent"
					onClick={handleSubmit((data) => onSubmit({ data, step }))}
					disabled={loading}
				>
					Proceed
				</Button>
			)	: 	(
				<Button
					size="lg"
					themeType="accent"
					role="presentation"
					onClick={onSubmit}
					disabled={loading}
				>
					Submit
				</Button>
			)}
		</div>
	);
}

export default ButtonLayout;
