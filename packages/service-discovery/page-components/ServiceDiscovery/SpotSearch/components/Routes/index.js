import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import getDefaultPayload from '../../utils/getDefaultPayload';

import RouteForm from './RouteForm';
import styles from './styles.module.css';

function Routes({
	mode = {},
	location = {},
	setLocation = () => {},
	handleSubmit,
	errors,
	organization,
	watch,
	createSearch,
	createSearchLoading,
}) {
	const router = useRouter();

	const buttonDisabled = !location?.origin || !location?.destination;

	const service_type = mode.mode_value;

	const formValues = watch();

	const onClickSearch = async () => {
		if (!isEmpty(errors)) {
			return;
		}

		const default_payload = getDefaultPayload({
			serviceType : service_type,
			origin      : location.origin,
			destination : location.destination,
		});

		const spot_search_id = await createSearch({
			action : 'default',
			values : { default_payload, service_type, ...organization, ...formValues },
		});

		router.push(
			'/book/[spot_search_id]/[importer_exporter_id]',
			`/book/${spot_search_id}/${organization.organization_id}`,
		);
	};

	return (
		<div className={styles.container}>

			<div className={styles.route_form}>
				<div className={styles.heading}>{`Enter ${mode?.mode_label} Details`}</div>

				<RouteForm
					mode={mode}
					location={location}
					setLocation={setLocation}
				/>
			</div>

			<div className={styles.search_button}>
				<Button
					size="xl"
					themeType="accent"
					disabled={buttonDisabled}
					onClick={handleSubmit(onClickSearch)}
					loading={createSearchLoading}
				>
					Find Rates

				</Button>
			</div>

		</div>
	);
}

export default Routes;
