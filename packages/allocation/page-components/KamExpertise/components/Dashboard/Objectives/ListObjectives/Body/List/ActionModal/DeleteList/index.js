import React from 'react';

import styles from '../styles.module.css';

function DeleteList() {
	return (
		<div className={styles.delete_modal_body}>
			<div>
				<strong>
					Are you sure you want to Delete List?
					{' '}
				</strong>
				The current list will not be available for use once deleted.
			</div>
			<div style={{ marginTop: '24px' }}>
				You may Regenerate a new List after deletion.
			</div>
		</div>
	);
}

export default DeleteList;
