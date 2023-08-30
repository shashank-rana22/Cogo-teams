import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import ApplyResignationModal from './ApplyResignationModal';
import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const [showModal, setShowModal] = useState(false);

	const onClickAddNewJoinee = () => {
		const HREF = '/new-employee-dashboard/add';
		router.push(HREF, HREF);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>New Employee Dashboard</div>

			<ApplyResignationModal showModal={showModal} setShowModal={setShowModal} />

			<Button type="button" size="lg" onClick={() => setShowModal(true)}>Resignation</Button>

			<div className={styles.button_container}>
				<Button type="button" size="lg" onClick={onClickAddNewJoinee}>Add new joinee</Button>
			</div>
		</div>
	);
}

export default Header;
