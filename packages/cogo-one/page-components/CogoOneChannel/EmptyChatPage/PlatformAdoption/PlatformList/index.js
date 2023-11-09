import Loader from '../Loader';

import List from './List';

function PlatformList({
	loading = false, list = [], onboardingRequest = () => {}, setActiveTab = () => {},
	setVerifyAccount = () => {}, verifyAccount = {}, mailProps = {}, initialViewType = '',
}) {
	return loading ? <Loader /> : (
		<List
			setActiveTab={setActiveTab}
			setVerifyAccount={setVerifyAccount}
			verifyAccount={verifyAccount}
			list={list}
			onboardingRequest={onboardingRequest}
			mailProps={mailProps}
			initialViewType={initialViewType}
		/>
	);
}

export default PlatformList;
