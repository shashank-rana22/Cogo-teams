import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ButtonLayout(
	{
		activeStepper = {},
		loading = false,
		handleSubmit = () => {},
		onSubmit = () => {},
	},
) {
	const { step = 0 } = activeStepper || {};

	return (
		<div className={styles.button_container}>
			<Button size="lg" themeType="tertiary" style={{ marginRight: '60px' }} disabled={loading}>Cancel</Button>
			{activeStepper?.step <= 4
				? (
					<Button
						size="lg"
						themeType="accent"
						onClick={handleSubmit(() => onSubmit(step))}
						disabled={loading}
					>
						Procced
					</Button>
				)
				: <Button size="lg" themeType="accent" disabled={loading}>Submit</Button>}
		</div>
	);
}

export default ButtonLayout;
