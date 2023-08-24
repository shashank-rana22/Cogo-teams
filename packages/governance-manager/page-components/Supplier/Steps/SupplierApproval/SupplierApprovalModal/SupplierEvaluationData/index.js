import { Table } from '@cogoport/components';

import useGetOrganizationEvaluationDetails from '../../../SupplierEvaluation/hooks/useGetOrganizationEvaluationDetails';
import { columns, filterData } from '../../../SupplierEvaluation/utils/supplier-evaluation-utils';

function SupplierEvaluationData({ t, setShow, organization_id, setStatus, id, getOrganizationService }) {
	const {
		data: organizationEvaluationDetails,
	} = useGetOrganizationEvaluationDetails({ organization_id, id, setStatus, getOrganizationService });

	if (organizationEvaluationDetails) {
		return (
			<Table
				columns={columns({ t, setShow, isForApproval: true })}
				data={filterData(organizationEvaluationDetails)}
			/>
		);
	}
}
export default SupplierEvaluationData;
