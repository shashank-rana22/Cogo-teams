import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Header from './components/Header';
import ModeSelection from './components/ModeSelection';
import OtherServices from './components/OtherServices';
import Routes from './components/Routes';
import SalesDashboard from './components/SalesDashboard';
import useCreateSearch from './hooks/useCreateSearch';
import styles from './styles.module.css';

function SpotSearch() {
	const [organization, setOrganization] = useState({});
	const [selectedMode, setSelectedMode] = useState({
		mode_label : 'FCL',
		mode_value : 'fcl_freight',
	});
	const [selectedService, setSelectedService] = useState({});
	const [location, setLocation] = useState({});
	const [errors, setErrors] = useState({});

	const { createSearch, loading } = useCreateSearch();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header
					organization={organization}
					setOrganization={setOrganization}
					errors={errors}
					setErrors={setErrors}
				/>
			</div>

			<div className={styles.mode_selection}>
				<ModeSelection
					selectedMode={selectedMode}
					setSelectedMode={setSelectedMode}
					setSelectedService={setSelectedService}
					setLocation={setLocation}
				/>
			</div>

			{!isEmpty(selectedMode) ? (
				<>
					<div className={styles.locations}>
						<Routes
							mode={selectedMode}
							formValues={location}
							setFormValues={setLocation}
							organization={organization}
							errors={errors}
							createSearch={createSearch}
							createSearchLoading={loading}
							setErrors={setErrors}
						/>
					</div>

					<div className={styles.sales_dashboard}>
						<SalesDashboard importer_exporter_id={organization?.organization_id} />
					</div>
				</>
			) : null}

			<div className={styles.other_services}>
				<OtherServices
					selectedService={selectedService}
					setSelectedService={setSelectedService}
					setSelectedMode={setSelectedMode}
				/>
			</div>

			{isEmpty(selectedService) ? null : (
				<div className={styles.locations}>
					<Routes
						mode={selectedService}
						formValues={location}
						setFormValues={setLocation}
						organization={organization}
						errors={errors}
						createSearch={createSearch}
						createSearchLoading={loading}
						setErrors={setErrors}
					/>
				</div>
			)}

		</div>
	);
}

export default SpotSearch;
