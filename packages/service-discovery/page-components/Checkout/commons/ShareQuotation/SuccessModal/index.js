import { Modal } from '@cogoport/components';
import { IcMCrossInCircle, IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SuccessModal({ show = false, setShow = () => {}, quotationOptions = [] }) {
	const selectedModes = quotationOptions.reduce((acc, curr) => {
		if (curr.enabled && curr.isEligible) {
			return [...acc, curr.label];
		}

		return acc;
	}, []);

	return (
		<Modal
			placement="top"
			size="sm"
			show={show}
			onClose={() => setShow(false)}
			animate
			showCloseIcon
			closeOnOuterClick
		>
			<div className={styles.container}>
				<IcCFtick width="60px" height="60px" />

				<div className={styles.title}>Success</div>

				<div className={styles.description}>
					{`You have successfully sent the quotation through ${selectedModes.join(', ')}`}
				</div>

				<IcMCrossInCircle
					onClick={() => setShow(false)}
					width={20}
					height={20}
					className={styles.cross_icon}
				/>
			</div>
		</Modal>
	);
}

export default SuccessModal;
