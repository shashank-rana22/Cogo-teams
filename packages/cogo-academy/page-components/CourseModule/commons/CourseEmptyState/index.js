import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const MAPPING = {
	ongoing: {
		first_text  : 'You currently do not have any ongoing courses',
		second_text : '',
	},
	mandatory: {
		first_text  : 'You do not have any mandatory courses',
		second_text : '',
	},
	completed: {
		first_text  : 'You currently did not completed any course',
		second_text : '',
	},
	saved: {
		first_text  : 'You have not added any course to your saved list',
		second_text : 'Save courses you wish to do later',
	},
};

function CourseEmptyState({ activeTab, firstText }) {
	const { first_text = '', second_text = '' } = MAPPING[activeTab] || {};

	return (
		<div className={styles.container}>
			<div>{first_text || firstText}</div>

			<div className={styles.bold}>
				{!isEmpty(second_text) ? second_text : null}
			</div>
		</div>
	);
}

export default CourseEmptyState;
