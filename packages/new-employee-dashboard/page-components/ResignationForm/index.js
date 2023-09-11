import React from 'react';

import ResignationFormLanding from './ResignationFormLanding';
import ResignationProgress from './ResignationProgress';
import useGetApplicationProcessDetails from './useGetApplicationProcessDetails';

const FORM_COMPONENT_MAPPING = {
	resignation_form     : ResignationFormLanding,
	resignation_progress : ResignationProgress,
};

function ResignationForm() {
	const { data } = useGetApplicationProcessDetails();
	const Render = FORM_COMPONENT_MAPPING.resignation_progress;

	return (
		<div>
			<Render data={data} />
		</div>
	);
}

export default ResignationForm;
