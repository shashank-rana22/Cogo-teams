import { Button } from '@cogoport/components';
import { IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import SupplierApprovalModal from '../SupplierApprovalModal';

import styles from './styles.module.css';

function Item({ title, verify, setVerify, index }) {
	const [open, setOpen] = useState(false);
	return (
		<div className={styles.row}>
			<div className={styles.title}>{title}</div>
			<div className={styles.status_button}>
				{verify ? (
					<div className={styles.status_text}>

						<IcCFtick width={20} height={20} />
						<span style={{ marginLeft: '8px' }}> Verified</span>
					</div>
				) : (
					<div className={styles.status_text}>
						<IcCFcrossInCircle width={20} height={20} />
						<span style={{ marginLeft: '8px' }}> Rejected</span>
					</div>
				)}
				<Button
					className={styles.button}
					size="md"
					themeType="accent"
					onClick={() => {
						setOpen(true);
					}}
				>
					Open

				</Button>
			</div>
			{open && <SupplierApprovalModal open={open} setOpen={setOpen} verify={verify} setVerify={setVerify} index={index} />}
		</div>
	);
}
export default Item;
