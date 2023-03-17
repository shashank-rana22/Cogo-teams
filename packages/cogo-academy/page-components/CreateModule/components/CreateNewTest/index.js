import { Stepper } from '@cogoport/components';
import { useState } from 'react';

import DetailsAndQuestions from './components/DetailsAndQuestions';
import ReviewAndCriteria from './components/ReviewAndCriteria';
import TABS_MAPPING from './configs/TABS_MAPPING';
import styles from './styles.module.css';

function CreateTest() {
	const [activeStepper, setActiveStepper] = useState('details_and_questions');
	const [testId, setTestId] = useState(null);
	const COMPONENT_MAPPING = {
		details_and_questions: {
			component : DetailsAndQuestions,
			props     : {
				setTestId, setActiveStepper,
			},
		},
		review_and_criteria: {
			component : ReviewAndCriteria,
			props     : {
				testId, setActiveStepper,
			},
		},
	};

	const ActiveComponent = COMPONENT_MAPPING[activeStepper].component;

	const activeComponentProps = COMPONENT_MAPPING[activeStepper].props;

	return (
		<div>
			<div className={styles.tab_container}>
				<Stepper
					active={activeStepper}
					setActive={setActiveStepper}
					items={TABS_MAPPING}
				/>
			</div>

			<ActiveComponent {...activeComponentProps} />
		</div>
	);
}

export default CreateTest;
