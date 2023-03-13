import Greetings from '../GreetingsHeader';

function Header({
	badgeList,
	detailsData,
	setRefetch = () => {},
	partner_user_id = '',
	showMobileVerificationModal,
	setShowMobileVerificationModal = () => {},

}) {
	return (
		<Greetings
			badgeList={badgeList}
			detailsData={detailsData}
			setRefetch={setRefetch}
			partner_user_id={partner_user_id}
			showMobileVerificationModal={showMobileVerificationModal}
			setShowMobileVerificationModal={setShowMobileVerificationModal}
		/>
	);
}
export default Header;
