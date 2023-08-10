import React, { useState } from 'react';

import FormComponent from './FormComponent';
import SuccessComponent from './SucessComponent';

const COMPONENT_MAPPING = {
	form    : FormComponent,
	success : SuccessComponent,
};

function AddNewJoinee() {
	const [activePage, setActivePage] = useState('form');

	const componentProps = {
		form: {
			setActivePage,
		},
		success: {
			activePage,
		},
	};

	const Component = COMPONENT_MAPPING[activePage === 'form' ? 'form' : 'success'] || null;

	return (
		Component && (
			<Component
				key={activePage}
				{...(componentProps[activePage === 'form' ? 'form' : 'success'] || {})}
			/>
		)
	);
}

export default AddNewJoinee;
