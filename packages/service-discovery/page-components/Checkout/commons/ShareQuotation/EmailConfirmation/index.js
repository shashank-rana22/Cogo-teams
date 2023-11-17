import { Button, Checkbox, Modal } from '@cogoport/components';
import { useState, useContext } from 'react';

import { CheckoutContext } from '../../../context';
import ConfirmationTexts from '../../ConfirmationTexts';

import CancellationInfo from './CancellationInfo';
import DefaultQuotationInfo from './DefaultQuotationInfo';
import styles from './styles.module.css';

function EmailConfirmation({
	confirmation = false,
	handleSendEmail = () => {},
	setConfirmation = () => {},
	loading = false,
}) {
	const {
		rate,
		detail,
		primaryService,
	} = useContext(CheckoutContext);

	const [isChecked, setIsChecked] = useState(false);

	const { services = {}, trade_type = '' } = detail;

	const handleSubmit = async () => {
		await handleSendEmail();
		setConfirmation(false);
	};

	const confirmInfo = {
		services         : rate?.services,
		detailedServices : services,
		primaryService,
		trade_type       : detail?.trade_type,
		detail,
		confirmation     : 'Have you confirmed with customer?',
	};

	return (
		<Modal
			size="xl"
			show={confirmation}
			onClose={() => setConfirmation(false)}
		>

			<div className={styles.container}>

				<ConfirmationTexts
					primaryService={primaryService}
					trade_type={trade_type}
					services={rate?.services || []}
					detail={detail}
					detailedServices={Object.values(services)}
				/>

				<DefaultQuotationInfo />

				<CancellationInfo detail={confirmInfo.detail} />

				<div className={styles.checkbox_container}>
					<Checkbox checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />
					<div className={styles.checkbox}>{confirmInfo.confirmation}</div>
				</div>

				<Button
					type="button"
					loading={loading}
					onClick={handleSubmit}
					disabled={!isChecked}
					className={styles.btn}
				>
					Confirm
				</Button>
			</div>

		</Modal>
	);
}

export default EmailConfirmation;
