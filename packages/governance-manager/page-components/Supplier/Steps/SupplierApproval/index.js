import { Button, Tooltip } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import { useState } from 'react';

import Alert from './Alert';
import Item from './Item';
import styles from './styles.module.css';
import SupplierApprovalDueDiligenceModal from './SupplierApprovalDueDiligenceModal';
import SupplierApprovalModal from './SupplierApprovalModal';

function SupplierApproval({ setStatus }) {
	const [verify, setVerify] = useState([false, false, false, false]);
	const [open, setOpen] = useState(false);
	const [openDueDiligence, setOpenDueDiligence] = useState(false);
	return (
		<>
			<SupplierApprovalModal
				open={open}
				setOpen={setOpen}
				setVerify={setVerify}
				verify={verify}
			/>
			<SupplierApprovalDueDiligenceModal
				open={openDueDiligence}
				setOpen={setOpenDueDiligence}
				setVerify={setVerify}
				verify={verify}
			/>
			<div className={styles.parent}>
				<div className={styles.heading}>
					Supplier Approval
				</div>
				<div className={styles.container}>
					<Item
						title="Need Analysis Report"
						verify={verify}
						setVerify={setVerify}
						index={0}
						setOpen={setOpen}
					/>

					<Item
						title="Market Feedback Report"
						verify={verify}
						setVerify={setVerify}
						index={1}
						setOpen={setOpen}
					/>
					<Item
						title="Evaluations Parameter Report"
						verify={verify}
						setVerify={setVerify}
						index={2}
						setOpen={setOpen}
					/>
					<Item
						title="Financial Due Diligence Report"
						verify={verify}
						setVerify={setVerify}
						index={3}
						setOpen={setOpenDueDiligence}
					/>
					{' '}
				</div>
				<div className={styles.flex_right}>
					<Button
						themeType="secondary"
						onClick={() => setStatus('contract_sla')}
					>
						Save & Do it Later
					</Button>
					<div className={styles.right_submit_btn}>
						<div>
							<Tooltip content={<Alert />} placement="left" className={styles.alert}>
								<IcMAlert color="red" width={20} height={20} />
							</Tooltip>

						</div>
						<Button onClick={() => setStatus('contract_sla')}>Submit</Button>
					</div>

				</div>
			</div>
		</>

	);
}
export default SupplierApproval;
