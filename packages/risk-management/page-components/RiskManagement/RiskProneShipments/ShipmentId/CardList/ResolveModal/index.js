import { Modal, Button, Textarea } from '@cogoport/components';
import React, { useState } from 'react';

import useGetResolve from '../../../../hooks/useGetResolve';

import styles from './styles.module.css';

function ResolveModal({
	showResolveModal, setShowResolveModal, itemData, getDashboardData,
	getDahboardStatsData,
}) {
	const [remarks, setRemarks] = useState('');

	const {
		onResolveMark,
		resolveLoading,
	} = useGetResolve({ itemData, remarks, getDashboardData, getDahboardStatsData });

	return (
		<div className={styles.container}>
			<Modal size="md" show={showResolveModal} onClose={() => { setShowResolveModal(false); }} placement="top">
				<Modal.Header title="Mark Resolve" />
				<Modal.Body>
					<div>
						Remarks -
					</div>
					<Textarea
						name="remarks"
						className={styles.text_area}
						size="lg"
						placeholder="Enter here..."
						onChange={(value) => setRemarks(value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						themeType="secondary"
						style={{ marginRight: '8px' }}
						onClick={() => { setShowResolveModal(false); }}
					>
						Cancel
					</Button>
					<Button
						disabled={remarks === '' || resolveLoading}
						onClick={() => { onResolveMark(); }}
					>
						Resolve

					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ResolveModal;
