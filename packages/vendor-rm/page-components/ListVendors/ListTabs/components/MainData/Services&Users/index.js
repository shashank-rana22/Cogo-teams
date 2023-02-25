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

	const Component = COMPONENT_MAPPING[showForm];

	return (
		<div className={styles.padd}>

			<div className={styles.main}>
				<Header showForm={showForm} setShowForm={setShowForm} />

				{Component && (
					<Component
						setShowForm={setShowForm}
						getVendorData={data}
						refetchServicesPocs={refetchServicesPocs}
					/>
				)}

				<CompanyPOC data={data} refetchVendorInfo={refetchVendorInfo} />

				<ServicePOC
					allServicesAndPocs={allServicesAndPocs}
					loading={loading}
				/>
			</div>
		</div>
	);
}

export default ServicesUsers;
