import { Button, Tooltip } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import { useState } from 'react';

import Alert from './Alert';
import useGetOrganizationSupplierVerificationDetails from './hooks/useGetOrganizationSupplierVerificationDetails';
import Item from './Item';
import styles from './styles.module.css';
import SupplierApprovalDueDiligenceModal from './SupplierApprovalDueDiligenceModal';
import SupplierApprovalModal from './SupplierApprovalModal';
import { report } from './utils/report';

function SupplierApproval({ setStatus, id, organization_id, service_type }) {
	const [verify, setVerify] = useState({
		need_analysis_report           : null,
		market_feedback_report         : null,
		evaluation_paramenter_report   : null,
		financial_due_diligence_report : null,

	});
	const { getOrganizationSupplierVerificationDetails } =	 useGetOrganizationSupplierVerificationDetails({
		organization_id,
		organization_service_id: id,
		setVerify,
	});
	const [open, setOpen] = useState(null);
	return (
		<>
			{(open !== 'financial_due_diligence_report') && (
				<SupplierApprovalModal
					open={open}
					setOpen={setOpen}
					setVerify={setVerify}
					verify={verify}
					organization_id={organization_id}
					service_id={id}
					getOrganizationSupplierVerificationDetails={getOrganizationSupplierVerificationDetails}
					service_type={service_type}
				/>
			)}
			{(open === 'financial_due_diligence_report') && (
				<SupplierApprovalDueDiligenceModal
					open={open}
					setOpen={setOpen}
					setVerify={setVerify}
					verify={verify}
					getOrganizationSupplierVerificationDetails={getOrganizationSupplierVerificationDetails}
					organization_id={organization_id}
					organization_service_id={id}
				/>
			)}

			<div className={styles.parent}>
				<div className={styles.heading}>
					Supplier Approval
				</div>
				<div className={styles.container}>
					{
						report?.map((item) => (
							<Item
								key={item}
								title={item?.title}
								verify={verify}
								setVerify={setVerify}
								setOpen={setOpen}
								type={item?.type}
							/>
						))
					}
				</div>
				<div className={styles.flex_right}>
					<Button
						themeType="secondary"
						onClick={() => setStatus('contract_sla')}
					>
						Save & Do it Later
					</Button>
					<div className={styles.right_submit_btn}>
						<div>
							<Tooltip content={<Alert />} placement="left" className={styles.alert}>
								<IcMAlert color="red" width={20} height={20} />
							</Tooltip>

						</div>
						<Button onClick={() => setStatus('contract_sla')}>Submit</Button>
					</div>

				</div>
			</div>
		</>

	);
}
export default SupplierApproval;
