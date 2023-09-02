import ScopeSelect from '@cogoport/scope-select';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import TryOldBanner from '../../../common/TryOldBanner';

import Header from './components/Header';
import ModeSelection from './components/ModeSelection';
import OtherServices from './components/OtherServices';
import Routes from './components/Routes';
import SalesDashboard from './components/SalesDashboard';
import useCreateSearch from './hooks/useCreateSearch';
import styles from './styles.module.css';

function SpotSearch() {
	const [organization, setOrganization] = useState(() => {
		if (typeof window !== 'undefined') {
			const organization_id = new URLSearchParams(window?.location?.search)?.get('organization_id') || undefined;
			const user_id = new URLSearchParams(window?.location?.search)?.get('user_id') || undefined;
			const organization_branch_id = new URLSearchParams(window?.location?.search)?.get('organization_branch_id')
			|| undefined;

			return { organization_id, user_id, organization_branch_id };
		}

		return {};
	});

	const [selectedMode, setSelectedMode] = useState({
		mode_label : 'FCL',
		mode_value : 'fcl_freight',
	});
	const [selectedService, setSelectedService] = useState({});
	const [location, setLocation] = useState(() => {
		if (typeof window !== 'undefined') {
			const origin = new URLSearchParams(window?.location?.search)?.get('origin') || undefined;
			const destination = new URLSearchParams(window?.location?.search)?.get('destination') || undefined;

			return { origin: { id: origin }, destination: { id: destination } };
		}

		return {};
	});
	const [errors, setErrors] = useState({});
	const [isBannerVisible, setIsBannerVisible] = useState(true);

	const { createSearch, loading } = useCreateSearch();

	return (
		<div className={styles.container}>
			<TryOldBanner setIsBannerVisible={setIsBannerVisible} />

			<div className={styles.header} style={{ marginTop: isBannerVisible ? '24px' : '0px' }}>
				<div className={styles.scope_select}>
					<div className={styles.label}>Select Scope: </div>
					<ScopeSelect size="md" />
				</div>

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
						<SalesDashboard
							importer_exporter_id={organization?.organization_id}
							service_type={selectedMode?.mode_value}
							origin_location_id={location?.origin?.id}
							destination_location_id={location?.destination?.id}
							setLocation={setLocation}
							organization={organization}
							createSearch={createSearch}
							createSearchLoading={loading}
						/>
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
