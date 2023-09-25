import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import MessagesThread from './MessagesThread';
import styles from './styles.module.css';

function Messages({
	internalRoomId = '',
	loading = false, // todo
	firestore = {},
}) {
	if (loading) {
		return (
			<div className={styles.flex_div}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
					type="video/gif"
					alt="loading"
					width={100}
					height={100}
				/>
			</div>
		);
	}

	if (!internalRoomId) {
		return (
			<div className={styles.flex_div}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.new_conversation}
					alt="loading"
					width={200}
					height={200}
				/>
				<div className={styles.header}>You&apos;re starting a new conversation</div>
				<div className={styles.description}>
					Type your first message below.
				</div>
			</div>
		);
	}

	return (
		<MessagesThread firestore={firestore} roomId={internalRoomId} />
	);
}

export default Messages;
