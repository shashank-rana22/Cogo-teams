import React, { useState } from 'react';

import FormComponent from './FormComponent';
import SuccessComponent from './SucessComponent';

function AddNewJoinee() {
	const [activePage, setActivePage] = useState('form');

	const COMPONENT_MAPPING = {
		form: FormComponent,
	};

	const RenderedComponent = COMPONENT_MAPPING[activePage] ?? SuccessComponent;

	return <RenderedComponent activePage={activePage} setActivePage={setActivePage} />;
}

export default AddNewJoinee;
