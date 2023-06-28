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
			authKey : 'payments_dunning_severity_level_templates',
		},
		{ manual: true },
	);

	useEffect(() => {
		const getTemplateData = async () => {
			try {
				await trigger();
			} catch (err) {
				console.log('err-', err);
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
