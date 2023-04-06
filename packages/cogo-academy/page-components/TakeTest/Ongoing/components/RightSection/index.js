import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function RightSection({
	data = {},
	loading,
	setCurrentQuestion,
	currentQuestion,
	fetchQuestions,
	setShowInstructionsModal,
	setActiveState,
	setShowSubmitTestModal,
	total_question_count,
	user_appearance,
	setSubQuestion,
}) {
	return (
		<div className={styles.container}>
			<Header setShowInstructionsModal={setShowInstructionsModal} />

			<Body
				data={data}
				loading={loading}
				setCurrentQuestion={setCurrentQuestion}
				fetchQuestions={fetchQuestions}
				currentQuestion={currentQuestion}
				total_question_count={total_question_count}
				user_appearance={user_appearance}
				setSubQuestion={setSubQuestion}
			/>
			<Footer setActiveState={setActiveState} setShowSubmitTestModal={setShowSubmitTestModal} />
		</div>
	);
}

export default RightSection;
