import { Button, Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React, { useState } from 'react';

import usePostToSage from '../../hooks/usePostToSage';

import CancellationModal from './CancellationModal';
import styles from './styles.module.css';

function IRNCancel({ itemData }) {
	const [showCancellationModal, setShowCancellationModal] = useState(false);
	const [show, setShow] = useState(false);

	const { invoiceStatus, id } = itemData;

	const isAfterADay =		itemData?.irnGeneratedAt !== null
		? itemData.irnGeneratedAt + 86400000 >= Date.now()
		: false;

	const { postToSage, loading } = usePostToSage(id);

	const content = () => (
		<div className={styles.container}>
			{ isAfterADay && (
				<Button
					className="secondary sm"
					onClick={() => {
						setShowCancellationModal(true);
						setShow(false);
					}}
					style={{ marginBottom: '8px' }}
				>
					Cancel IRN
				</Button>
			)}
			{(['IRN_GENERATED', 'FAILED'].includes(invoiceStatus)) && (
				<Button
					disabled={loading}
					className="secondary sm"
					onClick={postToSage}
				>
					Post to Sage
				</Button>
			)}
		</div>
	);

	if (
		(isAfterADay)
		|| (['IRN_GENERATED', 'FAILED'].includes(invoiceStatus))
	) {
		return (
			<div className={styles.div_container}>
				<Popover
					placement="left"
					visible={show}
					render={content()}
				>
					<div>
						<IcMOverflowDot
							onClick={() => setShow(!show)}
							style={{ cursor: 'pointer' }}
							width="16px"
							height="16px"
						/>
					</div>
				</Popover>

				{showCancellationModal && (
					<CancellationModal
						itemData={itemData}
						showCancellationModal={showCancellationModal}
						setShowCancellationModal={setShowCancellationModal}
					/>
				)}
			</div>
		);
	}

	return null;
}

export default IRNCancel;
