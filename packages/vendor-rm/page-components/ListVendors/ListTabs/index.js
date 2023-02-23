/* eslint-disable no-unused-vars */
// import React from 'react';

// import { useRouter } from '@cogoport/next';
import BackButton from './components/Backbutton';
import Banner from './components/Banner';
import MainData from './components/MainData';
import useVendorInfo from './hooks/useVendorInfo';
// import styles from './styles.module.css';

function ListTabs() {
	const {
		loading,
		data,
		refetchVendorInfo,
	} = useVendorInfo();

	if (loading) {
		return null;
	}

	console.log('data after aopi', data);

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
