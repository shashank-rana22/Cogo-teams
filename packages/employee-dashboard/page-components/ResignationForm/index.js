import React from 'react';

import ResignationFormLanding from './ResignationFormLanding';
import ResignationProgress from './ResignationProgress';
import useGetEmployeeApplicationProcessDetails from './useGetEmployeeApplicationProcessDetails';

function ResignationForm() {
	const { data, refetch = () => {}, loading = false } = useGetEmployeeApplicationProcessDetails();

	const { application_exist } = data || {};

	if (application_exist) return <ResignationProgress data={data} loading={loading} />;

	return 	<ResignationFormLanding refetch={refetch} />;
}

export default ResignationForm;
