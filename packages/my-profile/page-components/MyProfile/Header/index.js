import Greetings from '../GreetingsHeader';

function Header({
	detailsData,
	setRefetch = () => {},
	partner_user_id = '',
	showMobileVerificationModal,
	setShowMobileVerificationModal = () => {},

}) {
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
