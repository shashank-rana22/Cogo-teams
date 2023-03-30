import { Modal, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import styles from './styles.module.css';

function Review() {
	const { push } = useRouter();
	const [modalData, setModalData] = useState(false);
	const handleClick = () => {
		push(
			'/business-finance/cogo-book/[active_tab]/[view]',
			'/business-finance/cogo-book/pl_statement/source_file',
		);

		setModalData(false);
	};
	return (
		<div>
			<div className={styles.button_flex}>
				<Button themeType="primary md" onClick={() => { setModalData(true); }}>Save</Button>

			</div>
			{modalData && (
				<Modal show={modalData} onClose={() => { setModalData(false); }}>
					<Modal.Header />
					<Modal.Body>
						<div className={styles.body_flex}>
							<div className={styles.bold_data}>Are you sure you want to do save this?</div>
							<div>You can’t undo this step & delete the data once it’s saved</div>
						</div>

					</Modal.Body>
					<Modal.Footer>
						<div className={styles.button_flex}>
							<Button onClick={() => { handleClick(); }}>Confirm</Button>
						</div>
					</Modal.Footer>
				</Modal>
			)}
		</div>
	);
}
export default Review;
