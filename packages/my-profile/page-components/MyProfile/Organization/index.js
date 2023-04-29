import { Button, Loader } from '@cogoport/components';
import React from 'react';

import Reportees from './Reportees';
import Reporting from './Reporting';
import styles from './styles.module.css';
import useOrganizationRMMapping from './useOrganizationRMMapping';

function Organization({ personDetails = {}, detailsLoading }) {
	const {
		loading = false,
		handleReset = () => {},
		hierarchy = {},
		params = {},
		setParams = () => {},
	} = useOrganizationRMMapping({ personDetails, detailsLoading });

	if (loading) {
		return (
			<div className={styles.loader_container}>
				<Loader className={styles.loader} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.button_container}>
				<div className={styles.primary_button}>
					<Button onClick={handleReset}>Reset</Button>
					{' '}

				</div>

			</div>

			{(hierarchy?.reporting_managers?.length > 0
				|| Object.keys(hierarchy?.user).length > 0) && (
					<Reporting
						user={hierarchy?.user}
						reporting_managers={hierarchy?.reporting_managers}
						params={params}
						setParams={setParams}
					/>
			)}

			{hierarchy?.reportees?.length > 0 && (
				<Reportees
					reportees={hierarchy?.reportees}
					params={params}
					setParams={setParams}
				/>
			)}
		</div>
	);
}

export default Organization;
