import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../commons/components/EmptyState';

import BackButton from './components/Backbutton';
import Banner from './components/Banner';
import MainData from './components/MainData';
import useVendorInfo from './hooks/useVendorInfo';
import styles from './styles.module.css';

function ListTabs() {
	const {
		getVendorLoading,
		data,
		refetchVendorInfo,
	} = useVendorInfo();

	if (getVendorLoading) {
		return (
			<div className={styles.loader_main}>
				<Loader className={styles.loader} />
			</div>
		);
	}
	if (isEmpty(data)) {
		return (
			<div className={styles.empty_state}>
				<EmptyState />
			</div>
		);
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
