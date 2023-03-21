import Greetings from '../GreetingsHeader';

function Header({
	userBadges,
	detailsData,
	setRefetch = () => {},
	partner_user_id = '',
	showMobileVerificationModal,
	setShowMobileVerificationModal = () => {},

}) {
	return (
		<Greetings
			userBadges={userBadges}
			detailsData={detailsData}
			setRefetch={setRefetch}
			partner_user_id={partner_user_id}
			showMobileVerificationModal={showMobileVerificationModal}
			setShowMobileVerificationModal={setShowMobileVerificationModal}
		/>
	);
}
export default Header;
