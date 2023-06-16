import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useCreateSearch from '../../hooks/useCreateSearch';
import getDefaultPayload from '../../utils/getDefaultPayload';

import RouteForm from './RouteForm';
import styles from './styles.module.css';

function Locations({ mode = {}, location = {}, setLocation = () => {}, handleSubmit, errors, organisation }) {
	const buttonDisabled = !location.origin || !location.destination;

	const service_type = mode.mode_value;

	const { createSearch, data, loading } = useCreateSearch();

	const onClickSearch = () => {
		if (!isEmpty(errors)) {
			return null;
		}
		const default_payload = getDefaultPayload({
			serviceType : service_type,
			origin      : location.origin,
			destination : location.destination,
		});

		createSearch({ action: 'default', values: { default_payload, service_type, ...organisation } });
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
					loading={loading}
				>
					Find Rates

				</Button>
			</div>

		</div>
	);
}

export default Locations;
