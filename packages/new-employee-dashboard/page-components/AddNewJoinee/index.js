import React, { useState } from 'react';

import FormComponent from './FormComponent';
import SuccessComponent from './SucessComponent';

function AddNewJoinee() {
	const [activePage, setActivePage] = useState('form');

	const COMPONENT_MAPPING = {
		form: <FormComponent setActivePage={setActivePage} />,
	};

	const RenderedComponent = COMPONENT_MAPPING[activePage] ?? <SuccessComponent activePage={activePage} />;

	return <RenderedComponent />;
}

export default AddNewJoinee;
