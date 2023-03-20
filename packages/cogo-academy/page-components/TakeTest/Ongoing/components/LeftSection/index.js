import { useState } from 'react';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function LeftSection() {
	const [currentQuestion, setCurrentQuestion] = useState(0);

	return (
		<div className={styles.container}>
			<Header />

			<Body currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />

			<Footer currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
		</div>
	);
}

export default LeftSection;
