import { Stepper } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetTest from '../../hooks/useGetTest';

import DetailsAndQuestions from './components/DetailsAndQuestions';
import ReviewAndCriteria from './components/ReviewAndCriteria';
import TABS_MAPPING from './configs/TABS_MAPPING';
import styles from './styles.module.css';

function CreateTest() {
	const router = useRouter();
	const test_id = router.query?.id;

	const [activeStepper, setActiveStepper] = useState('details_and_questions');

	const {
		loading,
		data,
		getTest,
	} = useGetTest();

	const COMPONENT_MAPPING = {
		details_and_questions: {
			component : DetailsAndQuestions,
			props     : {
				setActiveStepper,
				loading,
				data,
				test_id,
			},
		},
		review_and_criteria: {
			component : ReviewAndCriteria,
			props     : {
				setActiveStepper,
				loading,
				data,
				test_id,
			},
		},
	};

	useEffect(() => {
		if (!isEmpty(test_id)) { getTest({ test_id }); }
	}, [getTest, test_id, activeStepper]);

	const { component: ActiveComponent, props: activeComponentProps } = COMPONENT_MAPPING[activeStepper];

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
