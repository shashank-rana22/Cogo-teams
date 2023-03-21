import { useState } from 'react';

import LeftSection from './components/LeftSection';
import RightSection from './components/RightSection';
import useFetchQuestionsList from './hooks/useFetchQuestionList';
import styles from './styles.module.css';

function Ongoing({ testData }) {
	const [currentQuestion, setCurrentQuestion] = useState(1);

	const { loading, data } = useFetchQuestionsList({ currentQuestion });
	return ((
		<div className={styles.main_container}>
			<div className={styles.left_container}>
				<LeftSection
					data={data}
					testData={testData}
					loading={loading}
					currentQuestion={currentQuestion}
					setCurrentQuestion={setCurrentQuestion}
				/>
			</div>

			<div key={data?.data} className={styles.right_container}>
				<RightSection
					data={data}
					loading={loading}
					currentQuestion={currentQuestion}
					setCurrentQuestion={setCurrentQuestion}
				/>
			</div>
		</div>
	)
	);
}

export default Ongoing;
