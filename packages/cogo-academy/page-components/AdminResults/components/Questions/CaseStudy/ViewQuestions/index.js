import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../CreateModule/components/EmptyState';
import useListTestCaseStudyQuestions from '../../hooks/useListTestCaseStudyQuestions';

import Header from './Header';
import styles from './styles.module.css';
import ViewQuestionItem from './ViewQuestionItem';

function ViewQuestions({ question_id = '', test_id = '' }) {
	const { data = {}, loading } = useListTestCaseStudyQuestions({ test_id, question_id });

	const { list = [] } = data;

	if (loading) {
		return (
			<div className={styles.placeholder_container}>
				{[...Array(3).keys()].map((item) => (
					<div
						key={item}
						className={styles.placeholder_inner_container}
					>
						<Placeholder height="24px" />
					</div>
				))}
			</div>
		);
	}

	if (isEmpty(list)) {
		return <EmptyState />;
	}

	return (
		<div>
			<Header />

			{list.map((item) => (
				<ViewQuestionItem
					key={item.id}
					question_item={item}
					test_id={test_id}
				/>
			))}
		</div>
	);
}

export default ViewQuestions;
