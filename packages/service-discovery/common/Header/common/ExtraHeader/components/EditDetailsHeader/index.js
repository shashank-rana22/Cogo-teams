import { Button, Toast, cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import getPrefillForm from '../../../../../../page-components/SearchResults/utils/getPrefillForm';
import getLocationInfo from '../../../../../../page-components/SearchResults/utils/locations-search';
import OrganisationForm from '../../../../../OrganisationForm';
import RouteForm from '../../../../../RouteForm';
import getFtlPrefillValues from '../../../../utils/getFtlPrefillValues';

import styles from './styles.module.css';

const SERVICE_KEY = 'search_type';

function removeItemFromLocalStorage() {
	localStorage.removeItem('additionalFormInfo');
}

function EditDetailsHeader({
	data = {},
	setShow = () => {},
	setRouterLoading = () => {},
	touch_points = {},
	createLoading = false,
	createSearch = () => {},
	...rest
}) {
	const router = useRouter();

	const [ftlFormData, setFtlFormData] = useState(getFtlPrefillValues(data, touch_points));

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
		const { origin:originValues = {}, destination:destinationValues = {} } = locationValues;

		const {
			organization_id: orgId = '',
			user_id: userId = '',
		} = organization || {};

		const { id: origin_id = '' } = originValues;
		const { id: destination_id = '' } = destinationValues;

		if (!origin_id || !destination_id) {
			return;
		}

		if (origin_id === destination_id) {
			Toast.error('Origin and Destination cannot be same');
			return;
		}

		if (!orgId || !userId) {
			Toast.error('Please provide organization details');
			return;
		}

		const loadValues = getPrefillForm(data, 'search_type');

		const spot_search_id = await createSearch({
			action : 'quick-search',
			values : {
				service_type,
				...organization,
				...locationValues,
				formValues: { ...loadValues, ftlFormData, touch_points },
			},
		});

		if (spot_search_id && typeof spot_search_id === 'string') {
			setShow({});

			removeItemFromLocalStorage();

			setRouterLoading(true);

			router.push(
				'/book/[spot_search_id]',
				`/book/${spot_search_id}`,
			);
		}
	};

	return (
		<div className={styles.container}>
			<div className={cl`${styles.form} ${styles[service_type]}`}>
				<div className={cl`${styles.form_item} ${styles[service_type]} ${styles.organization}`}>
					<OrganisationForm
						organization={organization}
						setOrganization={setOrganization}
						defaultValues={{
							organization_id        : importer_exporter_id,
							organization_branch_id : importer_exporter_branch_id,
							user_id,
						}}
					/>
				</div>

				<div className={cl`${styles.form_item} ${styles[service_type]}`}>
					<RouteForm
						mode={service_type}
						formValues={locationValues}
						setFormValues={setLocationValues}
						intent="rate_search"
						organization={organization}
						setFtlFormData={setFtlFormData}
						ftlFormData={ftlFormData}
					/>
				</div>
			</div>

			<Button
				size="lg"
				themeType="accent"
				disabled={createLoading}
				loading={createLoading}
				onClick={onClickApply}
				className={styles.button}
			>
				Apply
			</Button>
		</div>
	);
}

export default EditDetailsHeader;
