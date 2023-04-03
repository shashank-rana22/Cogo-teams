// import { Badge } from '@cogoport/components';
import { Button, RTEditor, Chips } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMDislike, IcMLike } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useListFeedbacks from '../hooks/useListFeedbacks';

import styles from './styles.module.css';

function FeedbackForm({
	answerData = {},
	isFeedbackAvailable = {},
	setIsFeedbackAvailable = () => {},
	handleSubmit = () => {},
	onSubmit = () => {},
	errors = {},
	control,
	answer,
	setAnswer,
}) {
	const {
		// data,
		// loading,
		singleSelected,
		setSingleSelected,
		options,
	} = useListFeedbacks();

	return (
		<>
			<div className={styles.container}>
				<header>
					<h2>Give us your feedback</h2>
				</header>

				<section className={styles.section_container}>
					<h4>Have a feedback on the question?</h4>
					<section className={styles.all_icons}>
						<div
							role="presentation"
							className={styles.icon_container}
							style={isFeedbackAvailable?.on_question ? { background: '#FEDE00' } : {}}
							onClick={() => setIsFeedbackAvailable((pv) => ({
								...pv,
								on_question: true,
							}))}
						>
							<IcMLike />
							{' '}
							Yes
						</div>
						<div
							role="presentation"
							className={styles.icon_container}
							onClick={() => setIsFeedbackAvailable((pv) => ({
								...pv,
								on_question: false,
							}))}
						>
							<IcMDislike />
							{' '}
							No
						</div>
					</section>
				</section>

				<section className={styles.section_container}>
					<h4>Rephrase the question</h4>
					<section>
						<InputController
							control={control}
							name="question"
							type="text"
							placeholder="Enter text here"
							value={answerData?.question_abstract}
							rules={{ required: 'Question is required' }}
						/>
						{errors?.question ? (
							<div className={styles.error_text}>{errors?.question.message}</div>
						) : null}
					</section>
				</section>

				<section className={styles.section_container}>
					<h4>Have a feedback on the answer?</h4>
					<section className={styles.all_icons}>
						<div
							role="presentation"
							className={styles.icon_container}
							style={isFeedbackAvailable?.on_answer ? { background: '#FEDE00' } : {}}
							onClick={() => setIsFeedbackAvailable((pv) => ({
								...pv,
								on_answer: true,
							}))}
						>
							<IcMLike />
							{' '}
							Yes
						</div>
						<div
							role="presentation"
							className={styles.icon_container}
							onClick={() => setIsFeedbackAvailable((pv) => ({
								...pv,
								on_answer: false,
							}))}
						>
							<IcMDislike />
							{' '}
							No
						</div>
					</section>
				</section>

				<section className={styles.section_container}>
					<h4>Rephrase the answer</h4>
					<section>
						<RTEditor
							value={answer}
							onChange={setAnswer}
						/>
						{/* <TextAreaController
							control={control}
							name="answer"
							type="textArea"
							placeholder="Enter text here"
							value={answerData?.answers[0]?.answer}
							rules={{ required: 'Answer is required' }}
						/> */}

						{errors?.answer ? (
							<div className={styles.error_text}>{errors?.answer.message}</div>
						) : null}
					</section>
				</section>

				<footer>
					<div className={styles.button_container}>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => setIsFeedbackAvailable(() => ({
								overall: false,
							}))}
						>
							Cancel
						</Button>
						<Button
							size="md"
							themeType="primary"
							style={{ marginLeft: '16px' }}
							onClick={handleSubmit(onSubmit)}
						>
							Submit
						</Button>
					</div>
				</footer>
			</div>

			<div className={styles.container}>

				<h3>Feedbacks on this question</h3>

				<div className={styles.chips_container}>
					<Chips
						size="md"
						items={options}
						selectedItems={singleSelected}
						onItemChange={setSingleSelected}
					/>
				</div>

				<header>
					<p>
						27 MAR, 2023 08:00 PM
					</p>
				</header>

				<body className={styles.content}>
					<section className={styles.body_container}>
						<h4 className={styles.author_name}>Ashwin said: </h4>
						<h5>Question</h5>
						<p className={styles.question_text}>what are incoterms</p>
						<h5>
							<a style={{ color: '#034AFD' }} href="https://fonts.googleapis.com">Add as alias</a>
						</h5>
					</section>

					<section className={styles.answer_container}>
						<h5>Answer</h5>
						<p className={styles.question_text}>
							Incoterms, widely-used terms of sale, are a set of 11 internationally recognized rules
							which define the responsibilities of
							sellers and buyers. Incoterms specify who is responsible for paying for and managing
							the shipment, insurance,
							documentation, customs clearance, and other logistical activities.
						</p>
						<h5>
							<a style={{ color: '#034AFD' }} href="https://fonts.googleapis.com">Edit answer</a>
						</h5>
					</section>
				</body>

			</div>

		</>
	);
}

export default FeedbackForm;
