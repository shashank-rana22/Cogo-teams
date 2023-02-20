import React from 'react';

import TagComponent from './ConfigurationEngine/TagComponent';
import Header from './Header';
import QuestionsList from './QuestionsList';

function CreateFAQ() {
	return (
		<div>
			<Header />
			<QuestionsList />
			<TagComponent />
		</div>
	);
}

export default CreateFAQ;
