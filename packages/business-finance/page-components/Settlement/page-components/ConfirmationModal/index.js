import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ConfirmationModal({ showConfirm, setShowConfirm, post, item, deleteJv, loading }) {
	const context = showConfirm === 'post' ? 'Post To Sage' : 'Delete';
	return (
		<Modal
			show={!isEmpty(showConfirm)}
			placement="top"
			closeOnOuterClick={false}
			onClose={() => { setShowConfirm(false); }}
		>
			<div className={styles.heading}>
				Are you sure you want to
				{' '}
				{context}
				{' '}
				this entry?
			</div>
			<div className={styles.buttons}>
				<Button themeType="secondary" onClick={() => { setShowConfirm(false); }}>Cancel</Button>
				{showConfirm === 'post' ? (
					<Button
						themeType="primary"
						onClick={() => { post(item.id); }}
						className={styles.post}
						loading={loading}
					>
						Post
					</Button>
				) : null}
				{showConfirm === 'delete' ? (
					<Button
						themeType="primary"
						onClick={() => { deleteJv(item.id); }}
						loading={loading}
						className={styles.post}
					>
						Delete
					</Button>
				) : null}
			</div>
		</Modal>
	);
}

export default ConfirmationModal;
