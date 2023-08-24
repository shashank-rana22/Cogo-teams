import { Table } from '@cogoport/components';
import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';

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
				<div className={styles.flex}>
					Will They provide BL delivery via Courier or Runner
					{' '}
					{organizationEvaluation?.act_basis_consignee_mbl ? <IcCFtick /> : <IcCFcrossInCircle />}
				</div>
				<div className={styles.flex}>
					Agress to Act Basic Consignee MBL with Us?
					{' '}
					{organizationEvaluation?.provide_bl ? <IcCFtick /> : <IcCFcrossInCircle />}
				</div>

				<div className={styles.feedback}>
					<div className={styles.feedback_heading}>
						Feedback
					</div>
					{organizationEvaluation?.feedback}
				</div>
			</>

		);
	}
}
export default SupplierEvaluationData;
