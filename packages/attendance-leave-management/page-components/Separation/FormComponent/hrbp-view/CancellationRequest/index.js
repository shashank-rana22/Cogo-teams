import { Button } from '@cogoport/components';
import { IcMInformation, IcMCross, IcMTick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';
import useUpdateCancellationRequest from './useUpdateCancellationRequest';

function CancellationRequest({ data = {}, refetch = () => {} }) {
	console.log('🚀 ~ file: index.js:9 ~ CancellationRequest ~ data:', data);
	const { onRequestCancelApplication } = useUpdateCancellationRequest({ data, refetch });

	return (
		<div className={styles.prompt}>
			<IcMInformation style={{ color: '#EE3425' }} width={20} height={20} />
			<span className={styles.prompt_text}>Rahul Dev has requested for cancellation of separation.</span>
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
