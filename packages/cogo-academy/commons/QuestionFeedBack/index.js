import { Avatar, Pill } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function QuestionFeedBack() {
	return (
		<div className={styles.container}>
			<h3>Feedbacks on this question</h3>
			<div className={styles.pills_container}>
				{[].map(() => (
					<Pill className={styles.pill}>All 12</Pill>
				))}
				<Pill className={styles.pill}>All 12</Pill>
				<Pill className={styles.pill}>Questions 8</Pill>
				<Pill className={styles.pill}>Answers 5</Pill>
				<Pill className={styles.pill}>Both Questions & Answers 5</Pill>
			</div>

			<p className={styles.time_stamp}>27 MAR, 2023 08:00 PM</p>

			<div className={styles.card}>
				<div className={styles.card_header}>
					<Avatar
						src="https://www.w3schools.com/howto/img_avatar.png"
						alt="img"
						size="40px"
					/>
					<h3 className={styles.card_header_name}>
						Ashwin
						{' '}
						Said :
					</h3>
				</div>
				<div className={styles.card_body}>
					<div className={styles.question_container}>
						<div className={styles.body_heading}>Question</div>
						<div className={styles.question_abstract}>What are Incoterms?</div>
						<div className={styles.anchor_text}>Add as an Alias</div>
					</div>
					<div className={styles.answer_container}>
						<div className={styles.body_heading}>Answer</div>
						<div className={styles.answer_content}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
							when an unknown printer took a galley of type and scrambled it to make a type specimen book.
							It has survived not only five centuries, but also the leap into electronic typesetting,
							remaining essentially unchanged. It was popularised in the 1960s with the release of
							Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
							software like Aldus PageMaker including versions of Lorem Ipsum.
						</div>
						<div className={styles.anchor_text}>Edit Answer</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default QuestionFeedBack;
