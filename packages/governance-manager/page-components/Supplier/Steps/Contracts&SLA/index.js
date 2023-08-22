/* eslint-disable no-magic-numbers */
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import StepOne from './ContractItem/StepOne';
import StepTwo from './ContractItem/StepTwo';
import useGetOrganizationContract from './hooks/useGetOrganizationContract';
import styles from './styles.module.css';

function ContractSla({ organization_id, service_type }) {
	const [step, setStep] = useState(1);
	const { data, id, getOrganizationContract } = useGetOrganizationContract({ organization_id, service_type, step });
	const {
		control,
	} = useForm();

	const [negotiationIds, setNegotiationIds] = useState([]);

	return (
		<div className={styles.parent}>
			<div className={styles.heading}>
				<div className={styles.flex}>
					<div>
						Contract & SLA -
					</div>
					<div className={styles.headingsteps}>
						Step
						{' '}
						{step}
						/2
					</div>
				</div>
				{
					step === 2
					&& <Button size="md" themeType="primary">Renegotiate</Button>
				}
			</div>
			{data?.map((item, index) => (
				step === 1
					? (
						<StepOne
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
						onClick={() => {
							setStep(2);
						}}
					>
						Save & Next

					</Button>
					{' '}
					<Button
						themeType="secondary"
						style={{ fontWeight: 600 }}
						onClick={() => { setStep(1); }}
					>
						Save & Do It Later

					</Button>
				</div>
			) : (
				<div className={styles.step_two_footer}>
					{' '}
					<Button
						themeType="secondary"
						style={{ fontWeight: 600 }}
						onClick={() => { setStep(1); }}
					>
						Save & Do It Later

					</Button>
					<div className={styles.side_line_buttons}>
						<Button style={{ fontWeight: 600 }} onClick={() => { setStep(2); }}>Approve</Button>
						{' '}
						<Button
							themeType="secondary"
							style={{ fontWeight: 600 }}
							onClick={() => { setStep(1); }}
						>
							Reject

						</Button>

					</div>
				</div>
			)}
		</div>
	);
}
export default ContractSla;
