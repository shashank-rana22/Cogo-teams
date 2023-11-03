import PersonalDetail from './PersonalDetails';
import RateCard from './RateCard';

function SideBar({ pocDetails = {}, rateResponse = [] }) {
	return (
		<div>
			<PersonalDetail pocDetails={pocDetails} />

			<RateCard rateResponse={rateResponse} />
		</div>
	);
}

export default SideBar;
