import { Button } from '@cogoport/components';
import { IcMInformation, IcMCross, IcMTick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';
import useUpdateCancellationRequest from './useUpdateCancellationRequest';

function CancellationRequest({ data = {}, refetch = () => {} }) {
	const { onRequestCancelApplication } = useUpdateCancellationRequest({ data, refetch });
	const { applicant_details } = data || {};
	const { employee_name } = applicant_details || {};

	return (
		<div className={styles.prompt}>
			<IcMInformation style={{ color: '#EE3425' }} width={20} height={20} />
			<span className={styles.prompt_text}>
				{employee_name}
				{' '}
				has requested for cancellation of separation.
			</span>
			<div className={styles.buttons}>
				<Button
					style={{ background: '#fdebe9', color: 'black' }}
					onClick={() => onRequestCancelApplication('active')}
				>
					<IcMCross width={18} height={18} />
					<span>Reject</span>
				</Button>

				<Button
					className={styles.acc_btn}
					onClick={() => onRequestCancelApplication('cancelled')}
				>
					<IcMTick width={20} height={20} />
					<span>Accept</span>
				</Button>
			</div>
		</div>
	);
}

export default CancellationRequest;
