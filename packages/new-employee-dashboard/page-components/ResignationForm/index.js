import React from 'react';

import ResignationProgress from './ResignationProgress';

const FORM_COMPONENT_MAPPING = {
	resignation_form     : null,
	resignation_progress : ResignationProgress,
};

function ResignationForm() {
	const Render = FORM_COMPONENT_MAPPING.resignation_progress;

	return (
		<div>
			<Render />
		</div>
	);
}

export default ResignationForm;
