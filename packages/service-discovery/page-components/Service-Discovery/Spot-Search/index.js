import { Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
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
	const [selectedMode, setSelectedMode] = useState({});
	const [selectedService, setSelectedService] = useState('');
	const [location, setLocation] = useState({});

	const { control, formState:{ errors }, handleSubmit, watch, setValue } = useForm();

	const { createSearch, data, loading } = useCreateSearch();

	if (loading) {
		return (
			<div className={styles.loading}>
				<span className={styles.loading_text}>Looking for Rates</span>
				<Loader themeType="primary" style={{ width: 30, background: '#000000' }} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header
					organization={organization}
					setOrganization={setOrganization}
					control={control}
					errors={errors}
					watch={watch}
					setValue={setValue}
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
				<div className={styles.locations}>
					<Routes
						mode={selectedMode}
						location={location}
						setLocation={setLocation}
						organization={organization}
						handleSubmit={handleSubmit}
						errors={errors}
						watch={watch}
						createSearch={createSearch}
						createSearchLoading={loading}
					/>
				</div>
			) : null}

			<div className={styles.sales_dashboard}>
				<SalesDashboard />
			</div>

			<div className={styles.other_services}>
				<OtherServices
					selectedService={selectedService}
					setSelectedService={setSelectedService}
					setSelectedMode={setSelectedMode}
				/>
			</div>

		</div>
	);
}

export default SpotSearch;
