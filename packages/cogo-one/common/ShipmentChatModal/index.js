import { Modal } from '@cogoport/components';
import useSeen from '@cogoport/shipment-chat/hooks/useSeen';
import List from '@cogoport/shipment-chat/page-components/List';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function ShipmentChatModal({
	showShipmentChat = {},
	setShowShipmentChat = () => {},
}) {
	const { userId = '' } = useSelector((state) => ({ userId: state?.profile?.user?.id }));

	const [seenLoading, setSeenLoading] = useState(false);

	const { msgSeen } = useSeen();

	const MESSAGE_CONTENT_ARR = Object.keys(msgSeen || {}).map(
		(key) => ({
			...msgSeen[key],
			mainKey: key,
		}),
	);

	if (isEmpty(showShipmentChat)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Modal
				size="lg"
				placement="top"
				show
				onClose={() => setShowShipmentChat({})}
				closable={!seenLoading}
				className={styles.modal_styles}
			>
				<Modal.Body>
					<List
						setShow={(val) => {
							if (!val) {
								setShowShipmentChat({});
							}
						}}
						messageContentArr={MESSAGE_CONTENT_ARR}
						user_id={userId}
						setSeenLoading={setSeenLoading}
					/>
				</Modal.Body>
			</Modal>

		</div>
	);
}
export default ShipmentChatModal;
