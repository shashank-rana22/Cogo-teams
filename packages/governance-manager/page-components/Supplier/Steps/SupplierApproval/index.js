import { Button, Tooltip } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import { useState } from 'react';

import useUpdateOrganizationService from '../../hooks/useUpdateOrganizationService';

import Alert from './Alert';
import useGetOrganizationSupplierVerificationDetails from './hooks/useGetOrganizationSupplierVerificationDetails';
import Item from './Item';
import styles from './styles.module.css';
import SupplierApprovalDueDiligenceModal from './SupplierApprovalDueDiligenceModal';
import SupplierApprovalModal from './SupplierApprovalModal';
import { report } from './utils/report';

const FOUR = 4;

function SupplierApproval({ id, organization_id, service_type, getOrganizationService, role }) {
	const [verify, setVerify] = useState({
		need_analysis_report           : null,
		market_feedback_report         : null,
		evaluation_paramenter_report   : null,
		financial_due_diligence_report : null,

	});

	const [open, setOpen] = useState(null);

	const { getOrganizationSupplierVerificationDetails } =	 useGetOrganizationSupplierVerificationDetails({
		organization_id,
		organization_service_id: id,
		setVerify,
	});

	const { updateOrganizationService } = useUpdateOrganizationService({
		organization_id,
		stage_of_approval : 'contract_and_sla_updation',
		service           : service_type,
		getOrganizationService,
	});
	console.log(verify, 'abc');

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
								role={role}
							/>
						))
					}
				</div>

				{
					role === 'governance_lead'
							&& (
								<div className={styles.flex_right}>
									<div className={styles.right_submit_btn}>
										<div>
											<Tooltip content={<Alert />} placement="left" className={styles.alert}>
												<IcMAlert color="red" width={20} height={20} />
											</Tooltip>

										</div>
										<Button
											onClick={() => updateOrganizationService()}
											disabled={Object.values(verify)
												?.filter((i) => i === 'verified'
													|| i === 'rejected').length !== FOUR}
										>
											Submit

										</Button>
									</div>

								</div>
							)
				}
			</div>
		</>

	);
}
export default SupplierApproval;
