import Greetings from '../greetings';

// import styles from './styles.module.css';

function Header({
	detailsData,
	setRefetch = () => {},
	partner_user_id = '',
	showMobileVerificationModal,
	setShowMobileVerificationModal = () => {},

}) {
	// const { name = '' } = detailsData || {};

	return (
		<Greetings
			detailsData={detailsData}
			setRefetch={setRefetch}
			partner_user_id={partner_user_id}
			showMobileVerificationModal={showMobileVerificationModal}
			setShowMobileVerificationModal={setShowMobileVerificationModal}
		/>
	);
}
export default Header;
