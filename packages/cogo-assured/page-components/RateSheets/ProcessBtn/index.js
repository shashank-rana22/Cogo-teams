import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import useProcessRatesheet from '../../../hooks/useProcessRatesheet';

import styles from './styles.module.css';

function ProcessBtn({ item = {}, refetch = () => {} }) {
	const [show, setShow] = useState(false);
	const { apiTrigger = () => {}, loading } = useProcessRatesheet({
		refetch: () => {
			refetch();
			setShow(false);
		},
	});

	const handleProcess = () => {
		apiTrigger({ value: item });
	};
	return (
		<>
			<Button themeType="secondary" onClick={() => setShow(true)}>Process</Button>

			<Modal
				className="primary sm"
				show={show}
				onClose={() => setShow(false)}
				onOuterClick={() => setShow(false)}
				style={{ padding: 16 }}
			>
				Are you sure, you want to process this rate sheet?
				<div className={styles.button_container}>
					<Button
						className="secondary sm"
						onClick={() => setShow(false)}
						disabled={loading}
						style={{ textTransform: 'capitalize' }}
					>
						Cancel
					</Button>

					<Button
						className="primary sm"
						style={{ marginLeft: 8, textTransform: 'capitalize' }}
						loading={loading}
						onClick={() => handleProcess()}
					>
						Process
					</Button>
				</div>
			</Modal>
		</>
	);
}

export default ProcessBtn;
