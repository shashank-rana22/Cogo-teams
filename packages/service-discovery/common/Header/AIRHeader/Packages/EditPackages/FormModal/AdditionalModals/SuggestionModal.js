import { Modal, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SuggestionModal({
	show = '', // suggestion,warning
	setShow = () => {},
	setActiveTab = () => {},
}) {
	const onClose = () => {
		setShow('');
	};

	const onTakeMeThere = () => {
		setActiveTab('cargo_per_package');
		setShow('');
	};

	return (
		<Modal
			size="md"
			show={show}
			onClose={onClose}
			placement="top"
			animate
		>
			<Modal.Header title={(
				<div className={styles.header}>
					<IcMInfo className={styles.header_icon} />
					<span className={styles.header_text}>
						In this case, use &#8220;By Packing Type&#8221; option instead
					</span>
				</div>
			)}
			/>

			<Modal.Body>
				<p>
					If any unit is heavier than 150 kg or bigger than 110x65x65 cm, you
					should use &#8220;By Packing Type&#8221; option to calculate your
					shipment details
				</p>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					size="md"
					themeType="secondary"
					className={styles.first_button}
					onClick={onClose}
				>
					Take me back
				</Button>

				<Button
					type="button"
					size="md"
					themeType="accent"
					onClick={onTakeMeThere}
				>
					OK, take me there
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SuggestionModal;
