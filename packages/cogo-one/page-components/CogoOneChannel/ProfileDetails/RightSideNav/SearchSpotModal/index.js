import { Button, Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

function SearchSpotModal({
	searchSpotModal = false,
	setSearchSpotmodal = () => {},
	openNewTab = () => {},
	loading = false,
}) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);

	const handleOnSkip = () => {
		if (!loading) {
			openNewTab({ crm: 'searches', prm: 'searches' });
		}
		setSearchSpotmodal(false);
	};

	const handleOnboardCustomer = () => {
		const redirectURL = `/${partnerId}/create-importer-exporter`;

		window.open(redirectURL, '_blank');
		setSearchSpotmodal(false);
	};

	return (
		<Modal
			show={searchSpotModal}
			size="md"
			onClose={() => setSearchSpotmodal(false)}
			placement="top"
			className={styles.modal_container}
			scroll={false}
		>
			<Modal.Header />
			<Modal.Body>
				<div>
					This customer has not completed the onboarding process.
				</div>
				<div>
					Please continue with following options.
				</div>

			</Modal.Body>
			<Modal.Footer>
				<Button
					type="button"
					size="md"
					themeType="secondary"
					onClick={handleOnSkip}
					disabled={loading}
				>
					Skip
				</Button>

				<Button
					type="button"
					size="md"
					themeType="primary"
					className={styles.onboard_button}
					onClick={handleOnboardCustomer}
					disabled={loading}
				>
					Onboard Customer
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default SearchSpotModal;
