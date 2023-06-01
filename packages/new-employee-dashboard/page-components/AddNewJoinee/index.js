import React, { useState } from 'react';

import FormComponent from './FormComponent';
import SuccessComponent from './SucessComponent';

function AddNewJoinee() {
	const [activePage, setActivePage] = useState('form');

	if (activePage === 'form') {
		return <FormComponent setActivePage={setActivePage} />;
	}

	return <SuccessComponent activePage={activePage} />;
}

export default AddNewJoinee;
