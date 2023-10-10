import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import ScopeSelect from '@cogoport/scope-select';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import DotLoader from '../../../common/LoadingState/DotLoader';

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

	const [selectedMode, setSelectedMode] = useState({
		mode_label : 'FCL',
		mode_value : 'fcl_freight',
	});
	const [selectedService, setSelectedService] = useState({});
	const [location, setLocation] = useState({});
	const [errors, setErrors] = useState({});

	const { createSearch = () => {}, loading = false } = useCreateSearch();

	return (
		<div className={styles.container}>
			{loading ? (
				<div className={styles.loader}>
					<span className={styles.loading_text}>Please Wait!</span>
					<DotLoader dotsLegth={4} />
				</div>
			) : null}

			<div className={cl`${styles.wrapper} ${loading && styles.disabled}`}>
				<div className={styles.header}>
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
		</div>
	);
}

export default SpotSearch;
