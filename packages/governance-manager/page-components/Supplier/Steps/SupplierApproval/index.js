import { Button } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import { useState } from 'react';

import Item from './Item';
import styles from './styles.module.css';

function SupplierApproval({ setStatus }) {
	const [verify, setVerify] = useState([false, false, false, false]);
	return (
		<div className={styles.parent}>
			<div className={styles.heading}>
				Supplier Approval
			</div>
			<div className={styles.container}>
				<Item title="Need Analysis Report" verify={verify[0]} setVerify={setVerify} index={0} />
				<Item title="Ned Analysis Report" verify={verify[1]} setVerify={setVerify} index={1} />
				<Item title="Need Analysis Report" verify={verify[2]} setVerify={setVerify} index={2} />
				<Item title="Need Analysis Report" verify={verify[3]} setVerify={setVerify} index={3} />
			</div>
			<div className={styles.flex_right}>
				<Button
					themeType="secondary"
					onClick={() => setStatus()}
				>
					Save & Do it Later

				</Button>
				<div className={styles.right_submit_btn}>
					<IcMAlert color="red" width={20} height={20} />
					<Button onClick={() => setStatus()}>Submit</Button>
				</div>

			</div>
		</div>
	);
}
export default SupplierApproval;
