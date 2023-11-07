import Loader from '../Loader';

import List from './List';

function PlatformList({
	loading = false, list = [], onboardingRequest = () => {}, setActiveTab = () => {},
	setVerifyAccount = () => {}, verifyAccount = {}, mailProps = {},
}) {
	return loading ? <Loader /> : (
		<List
			setActiveTab={setActiveTab}
			setVerifyAccount={setVerifyAccount}
			verifyAccount={verifyAccount}
			list={list}
			onboardingRequest={onboardingRequest}
			mailProps={mailProps}
		/>
	);
}

export default PlatformList;
