import { useState } from 'react';

import CompanyPOC from './components/CompanyPOC';
import Header from './components/Header';
import COMPONENT_MAPPING from './components/Header/utils/component-mapping';
import ServicePOC from './components/ServicePOC';
import useGetListVendorPocServices from './hooks/useGetListVendorPocServices';
import styles from './styles.module.css';

function ServicesUsers({
	data = {},
	refetchVendorInfo = () => {},
}) {
	const {
		refetchServicesPocs,
		allServicesAndPocs = [],
		loading = false,
	} = useGetListVendorPocServices();

	const [showForm, setShowForm] = useState('');

	const ActiveComponent = COMPONENT_MAPPING[showForm?.title]?.Component;

	return (
		<div className={styles.padd}>

			<div className={styles.main}>
				<Header
					showForm={showForm}
					setShowForm={setShowForm}
				/>

				{ActiveComponent && (
					<ActiveComponent
						showForm={showForm}
						setShowForm={setShowForm}
						getVendorData={data}
						refetchServicesPocs={refetchServicesPocs}
						refetchVendorInfo={refetchVendorInfo}
					/>
				)}

				<CompanyPOC
					data={data}
					refetchVendorInfo={refetchVendorInfo}
				/>

				<ServicePOC
					allServicesAndPocs={allServicesAndPocs}
					loading={loading}
					setShowForm={setShowForm}
				/>
			</div>
		</div>
	);
}

export default ServicesUsers;
