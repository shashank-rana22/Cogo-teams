import { isEmpty } from '@cogoport/utils';

import BackButton from './components/Backbutton';
import Banner from './components/Banner';
import MainData from './components/MainData';
import useVendorInfo from './hooks/useVendorInfo';

function ListTabs() {
	const {
		getVendorLoading,
		data,
		refetchVendorInfo,
	} = useVendorInfo();

	if (getVendorLoading || isEmpty(data)) {
		return null;
	}

	return (
		<>
			<BackButton />
			<Banner data={data} />
			<MainData
				data={data}
				refetchVendorInfo={refetchVendorInfo}
			/>
		</>

	);
}

export default ListTabs;
