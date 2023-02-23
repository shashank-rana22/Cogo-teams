/* eslint-disable react/no-danger */				// TODOs
import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useEffect } from 'react';

import useGetQuestion from '../hooks/useGetQuestion';

import styles from './styles.module.css';

function PreviewQuestion({ setQuestionPreview }) {
	const router = useRouter();

	const { fetchQuestion, query, data } = useGetQuestion();

	const {
		question_abstract = '',
		answers = [],
		faq_topics = [],
		faq_tags = [],
	} = data || {};

	const tags = [];
	const topics = [];

	(faq_topics || []).map((faq_topic) => {
		const { name } = faq_topic || {};
		topics.push(name);
		return topics;
	});
	(faq_tags || []).map((faq_tag) => {
		const { name } = faq_tag || {};
		tags.push(name);
		return tags;
	});

	const { answer } = answers[0] || {};

	useEffect(() => {
		fetchQuestion();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	const onclickBack = () => {
		router.back();
		setQuestionPreview('create');
	};

	return (
		<div className={styles.container}>
			<div>
				<h1 className={styles.heading}>Create A Question</h1>
			</div>
			<div>
				<h5 className={styles.question_title}>Question</h5>
				<h1 className={styles.question}>
					{question_abstract}
					?
				</h1>
			</div>
			<div>
				<h5 className={styles.answer_title}>Answer</h5>
				<p className={styles.answer_content}>
					<div dangerouslySetInnerHTML={{ __html: answer }} />
				</p>
			</div>
			<div>
				<h5 className={styles.tags_title}>Tags</h5>
				<div className={styles.tags_container}>
					{tags.map((item) => (
						<button className={styles.tags_button}>{item}</button>
					))}
				</div>
			</div>

			<div>
				<h5 className={styles.tags_title}>Topics</h5>
				<div className={styles.tags_container}>
					{topics.map((item) => (
						<button className={styles.tags_button}>{item}</button>
					))}
				</div>
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					size="md"
					className={styles.save_button}
				>
					Save as Draft
				</Button>

				<Button
					themeType="primary"
					size="md"
					className={styles.publish_button}
				>
					Publish

				</Button>
				<div className={styles.goback_button} role="presentation" onClick={onclickBack}>
					Go Back & Edit
				</div>
			</div>
		</div>
	);
}

export default PreviewQuestion;
