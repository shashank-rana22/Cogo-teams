import { Button, Modal, RadioGroup, Select, FileSelect } from '@cogoport/components';
import { IcMAppDocumentUpload, IcMCloudUpload } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Upload from '../Upload';

import styles from './styles.module.css';

function Header({ refetch }) {
	const router = useRouter();
	const [show, setShow] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>File Uploader</div>

			<div className={styles.button_container}>
				<Button onClick={() => { setShow(true); }}>
					<IcMCloudUpload fill="#fff" height={16} width={16} style={{ marginRight: '4px' }} />
					Upload File
				</Button>
				<Upload show={show} setShow={setShow} refetch={refetch} />

			</div>

		</div>
	);
}

export default Header;
