import React, { useState } from 'react';

import FormComponent from './FormComponent';
import SuccessComponent from './SucessComponent';

function AddNewJoinee() {
	const [activePage, setActivePage] = useState('success');

	if (activePage === 'success') {
		return <SuccessComponent />;
	}
	return <FormComponent setActivePage={setActivePage} />;
}

export default AddNewJoinee;
