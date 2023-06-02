import React from 'react';
import Modal from '@cogoport/components';
import Form from './Form';
import styles from './styles.module.css';

function OnBoardUser  ({
	fetch = () => {},
	organization_id = '',
	show,
	setShow = () => {},
}) {
	return (
		<div className={styles.main_container}>
			<Modal show={show} className="primary xl" onClose={() => setShow(false)}>
				<div className={styles.main_container}>
					<div className={styles.heading}>Create Driver Poc</div>
					<Form
						fetch={fetch}
						organization_id={organization_id}
						setShow={setShow}
						show={show}
					/>
				</div>
			</Modal>
		</div>
	);
};

export default OnBoardUser;
