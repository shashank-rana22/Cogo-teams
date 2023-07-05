import { Button, Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import OrganisationForm from '../../../../common/OrganisationForm';
import RouteForm from '../../../../common/RouteForm';
import useCreateSearch from '../../../ServiceDiscovery/SpotSearch/hooks/useCreateSearch';
import getPrefillForm from '../../utils/getPrefillForm';
import getLocationInfo from '../../utils/locations-search';

import styles from './styles.module.css';

const SERVICE_KEY = 'search_type';

function EditDetailsHeader({ data = {}, setShow, ...rest }) {
	const { createSearch, loading } = useCreateSearch();

	const router = useRouter();

	const {
		importer_exporter_id = '',
		importer_exporter_branch_id = '',
		user_id = '',
	} = data || {};

	const service_type = data[SERVICE_KEY];

	const {
		origin = {},
		destination = {},
	} = getLocationInfo(data, {}, SERVICE_KEY);

	const [organization, setOrganization] = useState(rest.organization || {
		organization_id        : importer_exporter_id,
		organization_branch_id : importer_exporter_branch_id,
		user_id,
	});

	const [locationValues, setLocationValues] = useState({
		origin,
		destination,
	});

	const onClickApply = async () => {
		// if (!isEmpty(errors)) {
		// 	return;
		// }

		const { origin:originValues = {}, destination:destinationValues = {} } = locationValues;

		const { id: origin_id = '' } = originValues;
		const { id: destination_id = '' } = destinationValues;

		if (!origin_id || !destination_id) {
			return;
		}

		if (origin_id === destination_id) {
			Toast.error('Origin and Destination cannot be same');
			return;
		}

		const loadValues = getPrefillForm(data, 'search_type');

		const spot_search_id = await createSearch({
			action : 'quick-search',
			values : {
				service_type,
				...organization,
				...locationValues,
				formValues: loadValues,
			},
		});

		if (spot_search_id && typeof spot_search_id === 'string') {
			setShow({});

			router.push(
				'/book/[spot_search_id]/[importer_exporter_id]',
				`/book/${spot_search_id}/${organization.organization_id}`,
			);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.form}>

				<div style={{ width: '50%', marginRight: 20 }}>
					<OrganisationForm
						organization={organization}
						setOrganization={setOrganization}
						errors={{}}
						action="edit"
					/>
				</div>

				<div style={{ width: '50%' }}>
					<RouteForm
						mode={service_type}
						formValues={locationValues}
						setFormValues={setLocationValues}
					/>
				</div>

			</div>

			<Button
				size="lg"
				themeType="accent"
				disabled={loading}
				loading={loading}
				onClick={onClickApply}
				className={styles.button}
			>
				Apply
			</Button>
		</div>
	);
}

export default EditDetailsHeader;
