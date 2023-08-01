/* eslint-disable no-magic-numbers */
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import ContractItem from './ContractItem';
import useGetOrganizationContract from './hooks/useGetOrganizationContract';
import styles from './styles.module.css';

function ContractSla({ organization_id, service_type }) {
	const [step, setStep] = useState(1);
	const { data, id } = useGetOrganizationContract({ organization_id, service_type, step });
	const {
		control,
	} = useForm();

	return (
		<div className={styles.parent}>
			<div className={styles.heading}>
				Contract & SLA -
				<div className={styles.headingsteps}>
					Step
					{' '}
					{step}
					/2
				</div>
			</div>
			{data?.map((item, index) => (
				<ContractItem key={item} item={item} index={index} control={control} step={step} id={id} />
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
