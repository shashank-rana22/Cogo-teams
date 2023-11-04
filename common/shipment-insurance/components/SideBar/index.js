import PersonalDetail from './PersonalDetails';
import RateCard from './RateCard';

function SideBar({ pocDetails = {}, rateResponse = [], cargoDetails = {}, formHook = {} }) {
	return (
		<div>
			<PersonalDetail pocDetails={pocDetails} />

			<RateCard rateResponse={rateResponse} cargoDetails={cargoDetails} formHook={formHook} />
		</div>
	);
}

export default SideBar;
