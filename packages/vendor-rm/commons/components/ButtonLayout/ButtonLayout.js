import { Button } from '@cogoport/components';

// eslint-disable-next-line import/no-cycle
import COMPONENT_MAPPING from '../../../utils/component-mapping';

import styles from './styles.module.css';

function ButtonLayout(
	{
		activeStepper = {},
		setActiveStepper = () => {},
		loading = false,
		handleSubmit = () => {},
		onSubmit = () => {},
	},
) {
	const { step } = COMPONENT_MAPPING.find((item) => item.key === activeStepper.key);

	const onClickCancelButton = () => {
		setActiveStepper(COMPONENT_MAPPING[step - 2].key);
	};

	return (
		<div className={styles.button_container}>
			{
				step === 1 ? null : (
					<Button
						size="lg"
						themeType="secondary"
						style={{ marginRight: '60px' }}
						disabled={loading}
						onClick={onClickCancelButton}
					>
						Cancel
					</Button>
				)
			}

			{step <= 4
				? (
					<Button
						size="lg"
						themeType="accent"
						onClick={handleSubmit((data) => onSubmit({ data, step }))}
						disabled={loading}

					>
						Proceed
					</Button>
				)
				: <Button size="lg" themeType="accent" disabled={loading}>Submit</Button>}
		</div>
	);
}

export default ButtonLayout;
