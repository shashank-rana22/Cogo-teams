import React from 'react';

import ResignationFormLanding from './ResignationFormLanding';
import ResignationProgress from './ResignationProgress';

const FORM_COMPONENT_MAPPING = {
	resignation_form     : ResignationFormLanding,
	resignation_progress : ResignationProgress,
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
