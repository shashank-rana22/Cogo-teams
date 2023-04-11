import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import QuestionFeedBack from '../../../../commons/QuestionFeedBack';
import Spinner from '../../../../commons/Spinner';
import useGetQuestion from '../hooks/useGetQuestion';

import styles from './styles.module.css';

function PreviewQuestion({ setQuestionPreview, onClickPublish }) {
	const router = useRouter();

	const { fetchQuestion, query = {}, data, loading } = useGetQuestion();

	const { source = '' } = query || {};

	const {
		question_abstract = '',
		answers = [],
		faq_topics = [],
		faq_tags = [],
		faq_audiences = [],
		id = '',
		question_aliases = [],
	} = data || {};

	const tags = [];
	const topics = [];
	const audiences = [];

	(faq_topics || []).map((faq_topic) => {
		const { display_name } = faq_topic || {};
		topics.push(display_name);
		return topics;
	});

	(faq_tags || []).map((faq_tag) => {
		const { display_name } = faq_tag || {};
		tags.push(display_name);
		return tags;
	});

	(faq_audiences || []).map((faq_audience) => {
		const { name } = faq_audience || {};
		audiences.push(name);
		return audiences;
	});

	const { answer } = answers[0] || {};

	useEffect(() => {
		if (query.id) {
			fetchQuestion();
		}
	}, [fetchQuestion, query?.id]);

	const onclickEdit = (feedbackId) => {
		const showFeedbackId = feedbackId ? `&feedbackId=${feedbackId}` : '';

		const href = `/learning/faq/create/question?mode=create&id=${id}${showFeedbackId}`;
		router.push(href, href);
		setQuestionPreview('create');
	};

	const onClickBackButton = () => {
		const href = '/learning';
		router.push(href, href);
	};

	if (loading) {
		return (
			<div className={styles.spinner}>
				<Spinner
					height={60}
					width={60}
					borderWidth="7px"
					outerBorderColor="#FBD69F"
					spinBorderColor="red"
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.question_container}>
				<div className={styles.header}>
					<IcMArrowBack
						width={20}
						height={20}
						className={styles.back_icon}
						onClick={onClickBackButton}
					/>
					<h1 className={styles.heading}>Preview Question</h1>

				</div>

				<div>
					<h5 className={styles.question_title}>Question</h5>
					<h1 className={styles.question}>
						{question_abstract}
					</h1>
				</div>

				{
					!isEmpty(question_aliases) && (

						<div>
							<h5 className={styles.answer_title}>Aliases</h5>
							<p className={styles.answer_content}>
								{
							(question_aliases || []).map((alias, index) => {
								const { question_abstract:aliasQuestionAbstract = ' ' } = alias;
								return (
									<div className={styles.alias}>
										<span className={styles.span}>
											{index + 1}
											.
										</span>

										{' '}
										{aliasQuestionAbstract}
									</div>
								);
							})
						}

							</p>
						</div>
					)
				}

				<div>
					<h5 className={styles.answer_title}>Answer</h5>
					<p className={styles.answer_content}>
						<div dangerouslySetInnerHTML={{ __html: answer }} />
					</p>
				</div>

				<div>
					{!isEmpty(tags)
					&& <h5 className={styles.tags_title}>Tags</h5>}

					<div className={styles.tags_container}>
						{tags.map((item, index) => (
							<button
								key={`${item}_${index + 1}`}
								type="button"
								className={styles.tags_button}
							>
								{item}

							</button>
						))}
					</div>
				</div>

				<div>
					{!isEmpty(topics)
				&& <h5 className={styles.tags_title}>Topics</h5>}

					<div className={styles.tags_container}>
						{topics.map((item, index) => (
							<button
								key={`${item}_${index + 1}`}
								type="button"
								className={styles.tags_button}
							>
								{item}

							</button>
						))}
					</div>
				</div>

				<div>
					{!isEmpty(audiences)
				&& <h5 className={styles.tags_title}>Audiences</h5>}

					<div className={styles.tags_container}>
						{audiences.map((item, index) => (
							<button
								key={`${item}_${index + 1}`}
								type="button"
								className={styles.tags_button}
							>
								{item}

							</button>
						))}
					</div>
				</div>

				<div className={styles.button_container}>

					<Button
						type="button"
						themeType="secondary"
						size="md"
						className={styles.publish_button}
						onClick={() => onClickBackButton(id)}
					>
						Back
					</Button>
					<Button
						type="button"
						themeType="primary"
						size="md"
						className={styles.publish_button}
						onClick={() => onclickEdit()}
					>
						Edit
					</Button>
					{!(source === 'view')
					&& (
						<Button
							type="button"
							themeType="primary"
							size="md"
							className={styles.publish_button}
							onClick={() => onClickPublish({ data })}
						>
							Publish
						</Button>
					)}
				</div>

			</div>

			<QuestionFeedBack id={id} onClickEdit={onclickEdit} />

		</div>
	);
}

export default PreviewQuestion;
