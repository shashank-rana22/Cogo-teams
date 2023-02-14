import { Button } from '@cogoport/components';

import TABS_MAPPING from '../../../constants/tabs';

import styles from './styles.module.css';

function StepperForm({ activeStepper = {}, setActiveStepper = () => {} }) {
	const { step = 0 } = activeStepper || {};

	const changeStepper = (index) => {
		setActiveStepper(TABS_MAPPING[index]);
	};

	const Element = activeStepper?.component;

	return (
		<div className={styles.container}>
			<div>
				<Element />
			</div>
			<div className={styles.button_container}>
				<Button size="md" themeType="tertiary" style={{ marginRight: '20px' }}>Cancel</Button>
				{activeStepper?.step <= 4
					? <Button size="md" themeType="accent" onClick={() => changeStepper(step)}>Procced</Button>
					: <Button size="md" themeType="accent">Submit</Button>}
			</div>
		</div>
	);
}

export default StepperForm;
