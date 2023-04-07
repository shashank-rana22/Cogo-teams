import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import Spinner from '../../../commons/Spinner';
import Completion from '../Completion';
import useGetTest from '../hooks/useGetTest';
import Introduction from '../Introduction';
import Ongoing from '../Ongoing';

import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	introduction: {
		key       : 'introduction',
		component : Introduction,
	},
	ongoing: {
		key       : 'ongoing',
		component : Ongoing,
	},
	completed: {
		key       : 'completed',
		component : Completion,
	},
};

function Eligible({ currentQuestionId }) {
	const {
		query: { test_id },
		user: { id: user_id },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const [activeState, setActiveState] = useState('');

	const page = localStorage.getItem(`current_question_${test_id}_${user_id}`);

	const {
		loading = false,
		data,
	} = useGetTest({ id: test_id, user_id });

	const { test_user_mapping_state = 'introduction' } = data || {};

	useEffect(() => {
		setActiveState(test_user_mapping_state);
	}, [setActiveState, test_user_mapping_state]);

	useEffect(() => {
		if (localStorage.getItem(`current_question_${test_id}_${user_id}`)) {
			setActiveState('ongoing');

			// const elem = document.getElementById('maincontainer');

			// if (elem?.requestFullscreen) {
			// 	elem?.requestFullscreen();
			// } else if (elem?.webkitRequestFullscreen) { /* Safari */
			// 	elem?.webkitRequestFullscreen();
			// } else if (elem?.msRequestFullscreen) { /* IE11 */
			// 	elem?.msRequestFullscreen();
			// }
		}

		localStorage.setItem('visibilityChangeCount', 1);
	}, [test_id, user_id]);

	const Component = COMPONENT_MAPPING?.[activeState]?.component || Introduction;

	if (loading) {
		return (
			<div className={styles.spinner}>
				<Spinner
					height={60}
					width={60}
					borderWidth="6px"
					outerBorderColor="#FBD69F"
					spinBorderColor="red"
				/>
			</div>
		);
	}

	return (
		<div id="maincontainer" className={styles.container}>
			<Component
				setActiveState={setActiveState}
				currentQuestionId={currentQuestionId}
				loading={loading}
				testData={data}
				page={page}
				test_user_mapping_state={test_user_mapping_state}
			/>
		</div>
	);
}

export default Eligible;
