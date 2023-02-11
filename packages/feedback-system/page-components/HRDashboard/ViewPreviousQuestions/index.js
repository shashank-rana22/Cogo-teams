import { Button, Popover } from '@cogoport/components';
import { IcMActivePlans } from '@cogoport/icons-react';
import { useState } from 'react';

import useListFeedbackQuestions from '../../../hooks/useListFeedbackQuestions';

import Content from './Content';
import styles from './styles.module.css';

function ViewQuestionPopover() {
	const [showQuestion, setShowQuestion] = useState(false);

	const [params, setParams] = useState({
		filters: {
			department : 'technology',
			work_scope : 'Associate Software Engineer',
		},
		page       : 1,
		page_limit : 4,
	});

	const { data, loading, getQuestionList = () => {} } = useListFeedbackQuestions({
		status: 'active',
		params,
		showQuestion,
	});

	const openQuestions = () => {
		setShowQuestion(!showQuestion);

		if (!showQuestion) {
			getQuestionList();
		}
	};

	const { list = [], total_count = '' } = data || {};

	return (
		<div className={styles.popover_container}>
			<Popover
				visible={showQuestion}
				placement="bottom-start"
				render={(
					<Content
						params={params}
						setParams={setParams}
						list={list}
						total_
						total_count={total_count}
						loading={loading}
					/>
				)}
				// animation="shift-away"
				interactive
				onClickOutside={() => setShowQuestion(false)}
			>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => openQuestions()}
				>
					<IcMActivePlans style={{ marginRight: '4px' }} />
					Active Questions
				</Button>
			</Popover>
		</div>
	);
}

export default ViewQuestionPopover;
