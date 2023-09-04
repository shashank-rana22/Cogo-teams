import { Table } from '@cogoport/components';

import useGetOrganizationEvaluationDetails from '../../../SupplierEvaluation/hooks/useGetOrganizationEvaluationDetails';
import { columns, filterData } from '../../../SupplierEvaluation/utils/supplier-evaluation-utils';

import styles from './styles.module.css';

function SupplierEvaluationData({ t, setShow, organization_id, setStatus, id, getOrganizationService }) {
	const {
		data: organizationEvaluationDetails,
		organization_evaulation_details:organizationEvaluation,
	} = useGetOrganizationEvaluationDetails({ organization_id, id, setStatus, getOrganizationService });

	if (organizationEvaluationDetails) {
		return (
			<>
				<Table
					columns={columns({ t, setShow, isForApproval: true })}
					data={filterData(organizationEvaluationDetails)}
				/>

				<div className={styles.feedback}>
					<div className={styles.feedback_heading}>
						{t('supplier_page_supplier_evaluation_table_feedback_label')}
					</div>
					{organizationEvaluation?.feedback}
				</div>
			</>

		);
	}
}
export default SupplierEvaluationData;
