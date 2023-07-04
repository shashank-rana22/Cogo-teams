import { IcMDelete } from '@cogoport/icons-react';
import React, { useState } from 'react';

import DeleteModal from './DeleteModal';
import styles from './styles.module.css';

function Delete({ refetch, itemData }) {
	const [show, setShow] = useState(false);
	return (
		<div>
			<IcMDelete
				className={styles.delete}
				height={20}
				onClick={() => setShow(true)}
				width={20}
			/>
			{show ? (
				<DeleteModal
					show={show}
					setShow={setShow}
					itemData={itemData}
					refetch={refetch}
				/>
			) : null}
		</div>
	);
}

export default Delete;
