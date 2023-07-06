import { Button } from '@cogoport/components';
import { IcMCloudUpload } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Upload from '../Upload';

import styles from './styles.module.css';

function Header({ refetch }) {
	const [show, setShow] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>File Uploader</div>

			<div className={styles.button_container}>
				<Button type="button" onClick={() => { setShow(true); }}>
					<IcMCloudUpload fill="#fff" height={16} width={16} style={{ marginRight: '4px' }} />
					Upload File
				</Button>

				<Upload show={show} setShow={setShow} refetch={refetch} />
			</div>
		</div>
	);
}

export default Header;
