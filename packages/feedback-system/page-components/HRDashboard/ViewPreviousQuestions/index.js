// import Layout from '@cogo/business-modules/form/Layout';

import { Button, Popover } from '@cogoport/components';
import { IcMActivePlans } from '@cogoport/icons-react';
import { useState } from 'react';

import useListFeedbackQuestions from '../../../hooks/useListFeedbackQuestions';

import Content from './Content';
import styles from './styles.module.css';

function ViewQuestionPopover({ searchValue = '' }) {
	const [showQuestion, setShowQuestion] = useState(false);

	const [params, setParams] = useState({
		filters: {
			department : 'technology',
			work_scope : 'Associate Software Engineer',
		},
	});

	const { data, loading, getQuestionList = () => {} } = useListFeedbackQuestions({
		status: 'active',
		params,
		searchValue,
		showQuestion,
	});

	const openQuestions = () => {
		setShowQuestion(!showQuestion);

		if (!showQuestion) {
			getQuestionList();
		}
	};

	const { list = [] } = data || {};

	return (
		<div className={styles.popover_container}>
			<Popover
				visible={showQuestion}
				theme="light"
				placement="bottom-start"
				render={<Content params={params} setParams={setParams} list={list} loading={loading} />}
				animation="shift-away"
				interactive
				caret={false}
			>

				<Button
					className="secondary md"
					onClick={() => openQuestions()}
					style={{ backgroundColor: '#d6b300' }}
				>
					<IcMActivePlans style={{ marginRight: '4px' }} />
					Active Questions
				</Button>

			</Popover>
		</div>
	);
}

export default ViewQuestionPopover;
