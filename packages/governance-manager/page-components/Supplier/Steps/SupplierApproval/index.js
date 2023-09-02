import { Button, Tooltip } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useUpdateOrganizationService from '../../hooks/useUpdateOrganizationService';

import Alert from './Alert';
import useGetOrganizationSupplierVerificationDetails from './hooks/useGetOrganizationSupplierVerificationDetails';
import Item from './Item';
import styles from './styles.module.css';
import SupplierApprovalDueDiligenceModal from './SupplierApprovalDueDiligenceModal';
import SupplierApprovalModal from './SupplierApprovalModal';
import { report } from './utils/report';

function SupplierApproval({ t, id, organization_id, service_type, getOrganizationService, role }) {
	const [verify, setVerify] = useState({
		need_analysis_report           : null,
		market_feedback_report         : null,
		evaluation_paramenter_report   : null,
		financial_due_diligence_report : null,

	});

	const { push } = useRouter();

	const [open, setOpen] = useState(null);

	const { getOrganizationSupplierVerificationDetails } =	 useGetOrganizationSupplierVerificationDetails({
		organization_id,
		organization_service_id: id,
		setVerify,
	});

	const { updateOrganizationService } = useUpdateOrganizationService({
		organization_id,
		approval_stage : 'contract_and_sla_updation',
		service        : service_type,
		getOrganizationService,
	});

	return (
		<>
			{(open !== 'financial_due_diligence_report') && (
				<SupplierApprovalModal
					t={t}
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
					t={t}
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
					{t('supplier_page_supplier_approval_title')}
				</div>
				<div className={styles.container}>
					{
						report({ t, service_type })?.map((item) => (
							<Item
								t={t}
								key={item?.type}
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
											<Tooltip
												content={<Alert t={t} />}
												placement="left"
												className={styles.alert}
											>
												<IcMAlert color="red" width={20} height={20} />
											</Tooltip>

										</div>
										<Button
											onClick={async () => {
												await updateOrganizationService();
												push(
													'/governance-manager/',
													'/governance-manager/',
												);
											}}
											disabled={Object.values(verify)
												?.filter((i) => i === 'verified'
													|| i === 'rejected').length !== report({ t, service_type }).length}
										>
											{t('supplier_page_supplier_approval_submit_button_label')}
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
