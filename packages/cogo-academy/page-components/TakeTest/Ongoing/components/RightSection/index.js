import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function RightSection({ data = [], loading, setCurrentQuestion, currentQuestion, fetchQuestions }) {
	return (
		<div className={styles.container}>
			<Header />

			<Body
				data={data}
				loading={loading}
				setCurrentQuestion={setCurrentQuestion}
				fetchQuestions={fetchQuestions}
				currentQuestion={currentQuestion}
			/>
			<Footer />
		</div>
	);
}

export default RightSection;
