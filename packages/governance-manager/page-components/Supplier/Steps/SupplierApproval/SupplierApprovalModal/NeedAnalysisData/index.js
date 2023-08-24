import { Table } from '@cogoport/components';

import useGetOrganizationServiceSuppliers from '../../../NeedAnalysis/hooks/useListOrganizationExpertiseSuppliers';
import { columns } from '../../../NeedAnalysis/utils/need-analysis-utils';

function NeedAnalysisData({ t, setShow, service_type, id, organization_id }) {
	const {
		data: serviceExpertiseData,
	} = useGetOrganizationServiceSuppliers(
		{
			organization_id,
			service_type,
			page       : 1,
			service_id : id,
		},
	);
	if (serviceExpertiseData) {
		return (
			<Table
				columns={columns({ t, setShow, service_type, isForApproval: true })}
				data={serviceExpertiseData}
			/>
		);
	}
}
export default NeedAnalysisData;
