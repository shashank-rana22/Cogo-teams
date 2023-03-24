import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function RightSection({
	data = [],
	loading,
	setCurrentQuestion,
	currentQuestion,
	fetchQuestions,
	setShowInstructionsModal,
	setActiveState,
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
			/>
			<Footer setActiveState={setActiveState} />
		</div>
	);
}

export default RightSection;
