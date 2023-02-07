import { Checkbox } from '@cogoport/components';
import { useState } from 'react';

import QuestionsBox from '../../../../../common/QuestionsBox';

import styles from './styles.module.css';

function Questions({ item, index, setIsCheckedAll, setPreviousQuestions }) {
	const {
		question,
		remark,
		weight,
		id: feedback_question_id = '',
	} = item || {};
	const [checked, setIscheched] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.checkbox_container}>
				<Checkbox
					className="primary lg"
					checked={checked}
					onChange={(value) => {
						setIscheched(!checked);
						setIsCheckedAll((pv) => ({ ...pv, [index]: value }));
						setPreviousQuestions((pv) => ({
							...pv,
							[index]: {
								question,
								remark,
								weight,
								feedback_question_id,
								status: 'active',
							},
						}));
					}}
				/>
			</div>
			<div className={styles.question_container}>
				<QuestionsBox question_detail={item} />
			</div>
		</div>
	);
}

export default Questions;
