import { useState } from 'react';

import CaseStudy from './CaseStudy';
import quizData from './dummydata';
import SingleQuestion from './SingleQuestion';

function Body({ currentQuestion, setCurrentQuestion }) {
	const question = quizData[currentQuestion];

	const { type } = question;

	return (
		<div>
			{type !== 'case_study'
				? <SingleQuestion question={question} />
				: <CaseStudy question={question} /> }
			{/* {QUESTION_COMPONENT_MAPPING.single_correct.component} */}
		</div>
	);
}

export default Body;
