/* eslint-disable no-magic-numbers */
import { Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useUpdateOrganizationService from '../../hooks/useUpdateOrganizationService';

import StepOne from './ContractItem/StepOne';
import StepTwo from './ContractItem/StepTwo';
import useGetOrganizationContract from './hooks/useGetOrganizationContract';
import useSendOrganizationContractForRenegotiation from './hooks/useSendOrganizationContractForRenegotiation';
import styles from './styles.module.css';

function ContractSla({ organization_id, service_type, id:organization_service_id, role, t }) {
	const { push } = useRouter();
	const [step, setStep] = useState(
		{
			governance_manager : 1,
			governance_lead    : 2,
		}[role],
	);
	const { data, id, getOrganizationContract } = useGetOrganizationContract({ organization_id, service_type, step });
	const {
		control,
	} = useForm();

	const { updateOrganizationService } = useUpdateOrganizationService({
		organization_id,
		stage_of_approval : 'contract_and_sla_approval',
		service           : service_type,
	});

	const { updateOrganizationService:finalApproval } = useUpdateOrganizationService({
		organization_id,
		stage_of_approval : 'approved',
		service           : service_type,
	});

	const [negotiationIds, setNegotiationIds] = useState([]);
	const { sendOrganizationContractForRenegotiation } = useSendOrganizationContractForRenegotiation(
		{
			organization_service_id,
			negotiationIds,
			contract_id: id,
		},
	);

	return (
		<div className={styles.parent}>
			<div className={styles.heading}>
				<div className={styles.flex}>
					<div>
						{t('supplier_page_contract_sla_title')}
					</div>
				</div>
				{
					step === 2
					&& (
						<Button
							size="md"
							themeType="primary"
							disabled={negotiationIds?.length === 0}
							onClick={() => sendOrganizationContractForRenegotiation()}
						>
							{t('supplier_page_contract_sla_renegotiate_button_label')}
						</Button>
					)
				}
			</div>
			{data?.map((item, index) => (
				step === 1
					? (
						<StepOne
							t={t}
							key={item}
							item={item}
							index={index}
							control={control}
							step={step}
							id={id}
							getOrganizationContract={getOrganizationContract}
						/>
					)
					: (
						<StepTwo
							t={t}
							key={item}
							item={item}
							index={index}
							control={control}
							step={step}
							id={id}
							negotiationIds={negotiationIds}
							setNegotiationIds={setNegotiationIds}
							getOrganizationContract={getOrganizationContract}
						/>
					)

			))}

			{step === 1 ? (
				<div className={styles.footer}>
					{' '}
					<Button
						style={{ fontWeight: 600 }}
						onClick={async () => {
							await updateOrganizationService();
							Toast.success('Updated');
							push(
								'/governance-manager/',
								'/governance-manager/',
							);
						}}
					>
						{t('supplier_page_contract_sla_submit_and_next_button_label')}

					</Button>
					{' '}
					<Button
						themeType="secondary"
						style={{ fontWeight: 600 }}
						onClick={() => { setStep(1); }}
					>
						{t('supplier_page_contract_sla_save_and_do_it_later_button_label')}
					</Button>
				</div>
			) : (
				<div className={styles.step_two_footer}>
					<div className={styles.side_line_buttons}>
						<Button
							style={{ fontWeight: 600 }}
							onClick={async () => {
								await finalApproval('active');
								Toast.success('Updated');
								push(
									'/governance-manager/',
									'/governance-manager/',
								);
							}}
						>
							{t('supplier_page_contract_sla_approve_button_label')}

						</Button>
						{' '}
						<Button
							themeType="secondary"
							style={{ fontWeight: 600 }}
							onClick={async () => {
								await finalApproval('inactive');
								Toast.success('Saved');
								push(
									'/governance-manager/',
									'/governance-manager/',
								);
							}}
						>
							{t('supplier_page_contract_sla_reject_button_label')}

						</Button>

					</div>
				</div>
			)}
		</div>
	);
}
export default ContractSla;
