import { Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';

import { getMobilePrefixFromCountryCode } from '../../../../../utils/getMobilePrefixFromCountryCode';

import styles from './styles.module.css';

const COUNTRY_CODE_PREFIX = '%2B';

function SearchSpotModal({
	searchSpotModal = false,
	setSearchSpotmodal = () => {},
	openNewTab = () => {},
	loading = false,
	formattedMessageData = {},
	activeMessageCard = {},
}) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const { email = '', lead_user_details = {} } = formattedMessageData || {};
	const { mobile_no = '', country_code = '' } = activeMessageCard || {};
	const mobile_country_code = getMobilePrefixFromCountryCode(country_code);

	const mobile_number = (
		mobile_no.substr(GLOBAL_CONSTANTS.zeroth_index, mobile_country_code.length) === mobile_country_code
	) ? mobile_no.substr(mobile_country_code.length) : mobile_no;

	const userEmail = email || lead_user_details?.email;

	const emailParams = userEmail ? `&email=${userEmail}` : '';
	const countryCode = COUNTRY_CODE_PREFIX + mobile_country_code;

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
					Skip
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
