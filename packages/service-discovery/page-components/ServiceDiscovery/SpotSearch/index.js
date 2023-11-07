import { cl } from '@cogoport/components';
import Insurance from '@cogoport/insurance-form';
import { useRouter, Router } from '@cogoport/next';
import ScopeSelect from '@cogoport/scope-select';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import Wallet from '../../../common/Header/common/Wallet';
import CustomLoadingState from '../../../common/LoadingState/CustomLoadingState';
import useGetActiveServices from '../../../helpers/useGetActiveServices';
import useGetIsMobile from '../../../helpers/useGetIsMobile';

import Header from './components/Header';
import ModeSelection from './components/ModeSelection';
import OtherServices from './components/OtherServices';
import Routes from './components/Routes';
import SalesDashboard from './components/SalesDashboard';
import useCreateSearch from './hooks/useCreateSearch';
import styles from './styles.module.css';

function SpotSearch() {
	const { query = {} } = useRouter();

	const { user_id = '', organization_id = '', organization_branch_id = '' } = query;

	const [organization, setOrganization] = useState(() => {
		if (!isEmpty(query)) {
			return { organization_id, user_id, organization_branch_id };
		}

		return {};
	});

	const [selectedMode, setSelectedMode] = useState(query?.service_type);
	const [selectedService, setSelectedService] = useState({});
	const [location, setLocation] = useState({});
	const [errors, setErrors] = useState({});
	const [routerLoading, setRouterLoading] = useState(false);

	const {
		data:{ service_discovery = {} } = {},
		loading:bookableServicesLoading = false,
	} = useGetActiveServices();

	const { bookable_services = {} } = service_discovery || {};

	const isMobile = useGetIsMobile();

	const { createSearch = () => {}, loading = false } = useCreateSearch();

	useEffect(() => {
		Router.events.on('routeChangeStart', () => {
			setRouterLoading(true);
		});
		Router.events.on('routeChangeComplete', () => {
			setRouterLoading(false);
		});
	}, [setRouterLoading]);

	if (bookableServicesLoading) {
		return null;
	}

	return (
		<div className={styles.container}>
			{loading || routerLoading ? (
				<CustomLoadingState />
			) : null}

			<div className={cl`${styles.wrapper} ${(loading || routerLoading) && styles.disabled}`}>
				<div className={styles.header}>
					<div className={styles.scope_select}>
						<div className={styles.label}>Select Scope: </div>
						<ScopeSelect size="md" />

						<Wallet style={{ background: '#fff', marginLeft: 24 }} isMobile={isMobile} />
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
						bookable_services={bookable_services}
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

						<SalesDashboard
							importer_exporter_id={organization?.organization_id}
							service_type={selectedMode}
							origin_location_id={location?.origin?.id}
							destination_location_id={location?.destination?.id}
							setLocation={setLocation}
							organization={organization}
							createSearch={createSearch}
							createSearchLoading={loading}
						/>
					</>
				) : null}

				<OtherServices
					selectedService={selectedService}
					setSelectedService={setSelectedService}
					setSelectedMode={setSelectedMode}
					bookable_services={bookable_services}
				/>

				{isEmpty(selectedService) ? null : (
					<div className={styles.locations}>
						{selectedService.mode_value === 'insurance'
							? <Insurance organization={organization} />
							: (
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
							)}
					</div>
				)}
			</div>
		</div>
	);
}

export default SpotSearch;
