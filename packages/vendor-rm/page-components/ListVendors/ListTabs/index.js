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
	} = useVendorInfo();

	return (
		<>
			<BackButton />
			<Banner data={data} />
			<MainData data={data} />
		</>

	);
}

export default ListTabs;
