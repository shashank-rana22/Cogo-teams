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
}) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const {
		email = '',
		lead_user_details : leadUserDetails = {}, mobile_no : mobileNo = '', country_code : countryCode = '',
	} = formattedMessageData || {};
	const mobileCountryCode = getMobilePrefixFromCountryCode({ countryCode });

	const mobileNumber = (
		mobileNo?.substr(GLOBAL_CONSTANTS.zeroth_index, mobileCountryCode.length) === mobileCountryCode
	) ? mobileNo?.substr(mobileCountryCode.length) : mobileNo;

	const userEmail = email || leadUserDetails?.email;

	const emailParams = userEmail ? `&email=${userEmail}` : '';
	const formatCountryCode = COUNTRY_CODE_PREFIX + mobileCountryCode;

	const queryParams = `?mobile=${mobileNumber}&mobile_country_code=${formatCountryCode}${emailParams}`;

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
