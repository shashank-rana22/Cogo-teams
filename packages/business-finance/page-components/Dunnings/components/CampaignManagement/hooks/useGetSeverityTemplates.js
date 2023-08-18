import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetSeverityTemplates = () => {
	const [
		{ data: severityTemplate, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/severity-level-templates',
			method  : 'get',
			authKey : 'get_payments_dunning_severity_level_templates',
		},
		{ manual: true },
	);

	useEffect(() => {
		const getTemplateData = () => {
			try {
				trigger();
			} catch (err) {
				console.error(err);
			}
		};
		getTemplateData();
	}, [trigger]);

	return {
		severityTemplate,
		loading,
	};
};
export default useGetSeverityTemplates;
