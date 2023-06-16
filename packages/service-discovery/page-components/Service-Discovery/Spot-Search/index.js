import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Header from './components/Header';
import Locations from './components/Locations';
import ModeSelection from './components/ModeSelection';
import OtherServices from './components/OtherServices';
import styles from './styles.module.css';

function SpotSearch() {
	const [organisation, setOrganisation] = useState({});
	const [selectedMode, setSelectedMode] = useState({});
	const [selectedService, setSelectedService] = useState('');
	const [location, setLocation] = useState({});

	const { control, formState:{ errors }, handleSubmit, watch, setValue } = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header
					organisation={organisation}
					setOrganisation={setOrganisation}
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
				/>
			</div>

			{!isEmpty(selectedMode) ? (
				<div className={styles.locations}>
					<Locations
						mode={selectedMode}
						location={location}
						setLocation={setLocation}
						organisation={organisation}
						handleSubmit={handleSubmit}
						errors={errors}
					/>
				</div>
			) : null}

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
