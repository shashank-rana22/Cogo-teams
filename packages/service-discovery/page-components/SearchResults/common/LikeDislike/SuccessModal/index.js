import { Modal, Button } from '@cogoport/components';
import { IcCFtick, IcMCross } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SuccessModal({
	show = false,
	setShow = () => {},
}) {
	const onClose = () => setShow(false);

	return (
		<Modal size="sm" show={show} onClose={onClose} placement="right">
			<div className={styles.container}>
				<div className={styles.header}>
					<IcCFtick width={44} height={44} />

					<IcMCross
						className={styles.cross_icon}
						width={22}
						height={22}
						onClick={onClose}
					/>
				</div>

				<div className={styles.body}>
					<span className={styles.heading}>Success!</span>
					<span className={styles.text}>Your response has been submitted.</span>
				</div>

				<div className={styles.footer}>
					<Button
						type="button"
						size="md"
						themeType="accent"
						onClick={onClose}
					>
						Ok
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default SuccessModal;
