import { Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

const COUNTRY_CODE_PREFIX = '%2B';

function SearchSpotModal({
	searchSpotModal = false,
	setSearchSpotmodal = () => {},
	openNewTab = () => {},
	loading = false,
	userData = {},
}) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const { email = '', mobile_number = '', mobile_country_code = '' } = userData || {};

	const emailParams = email ? `&email=${email}` : '';
	const countryCodeRegex = GLOBAL_CONSTANTS.regex_patterns.mobile_country_code_format;
	const countryCode = mobile_country_code?.replace(countryCodeRegex, COUNTRY_CODE_PREFIX);

	const queryParams = `?mobile=${mobile_number}&mobile_country_code=${countryCode}${emailParams}`;

	const handleOnboardCustomer = () => {
		const redirectURL = `/${partnerId}/create-importer-exporter${queryParams}`;

		window.open(redirectURL, '_blank');
		setSearchSpotmodal(false);
	};

	const handleRedirecting = () => {
		if (!loading) {
			openNewTab({ crm: 'searches', prm: 'searches' });
		}
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
			<Modal.Header title="Warning" className={styles.modal_title} />
			<Modal.Body className={styles.modal_body}>
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
					themeType="tertiary"
					onClick={handleRedirecting}
				>
					Redirect anyway
				</Button>

				<Button
					type="button"
					size="md"
					themeType="primary"
					className={styles.onboard_button}
					onClick={handleOnboardCustomer}
				>
					Onboard Customer
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default SearchSpotModal;
