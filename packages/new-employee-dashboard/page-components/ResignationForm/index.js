import React from 'react';

const FORM_COMPONENT_MAPPING = {
	resignation_form     : null,
	resignation_progress : null,
};

function ResignationForm() {
	const Render = FORM_COMPONENT_MAPPING.resignation_form;

	return (
		<div>
			<Render />
		</div>
	);
}

export default ResignationForm;
