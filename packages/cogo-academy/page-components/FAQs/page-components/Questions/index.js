import { IcMDislike, IcMLike } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { React, useState, useRef } from 'react';

import useGetQuestions from '../../hooks/useGetQuestions';
import QuestionsCollapse from '../QuestionCollapse';

import styles from './styles.module.css';

function Questions({ questions }) {
	const [open, setOPen] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [id, setId] = useState(questions.id);
	const {
		refetchQuestions = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useGetQuestions({ id });
	console.log('dd:', data?.answers[0]);
	// const contentRef = useRef();
	// if (contentRef.current) console.log(contentRef.current.scrollHeight);
	const toggle = () => {
		setOPen(!open);
	};
	console.log('answers', data);
	return (

		<div className={styles.contentshow}>
			<div role="presentation" onClick={toggle}>
				<QuestionsCollapse collapse={open} questions={questions} />
			</div>
			{open && (
				<>
					<div className={styles.heading_container}>
						{startCase(data?.answers[0])}
					</div>
					<div>
						<span className={styles.sidetext}>
							{data?.view_count}
							{' '}
							people found it useful.
						</span>
						{'    '}
						<span className={styles.sidetext}>
							Last updated on:
							{' '}
							{data?.updated_at}
						</span>
					</div>
					<div className={styles.flex_items}>
						<span className={styles.subtitle}>Did you find this information helpful?</span>
						<div
							role="presentation"
							className={styles.like_container}
							onClick={() => setIsLiked(true)}
						>
							<IcMLike fill={isLiked ? '#9BEFA8' : '#000000'} />

						</div>

						<div
							role="presentation"
							className={styles.dislike_container}
							onClick={() => setIsLiked(false)}
						>
							<IcMDislike fill={isLiked ? '#000000' : '#ee3425'} />

						</div>
					</div>
					<div>
						<span className={styles.relatedquestion}>Related Questions</span>
						<div
							className={styles.subtitle}
							style={{ opacity: '0.8', marginTop: '1%' }}
						>
							When should I use EXW?
						</div>
						<div
							className={styles.subtitle}
							style={{ opacity: '0.8', marginTop: '1%' }}
						>
							What are the documents I need to procure for Incoterms?
						</div>

					</div>
				</>

			)}

		</div>
	);
}

export default Questions;
