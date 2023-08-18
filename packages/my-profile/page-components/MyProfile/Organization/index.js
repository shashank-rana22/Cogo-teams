import { Button, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Reportees from './Reportees';
import Reporting from './Reporting';
import styles from './styles.module.css';
import useOrganizationRMMapping from './useOrganizationRMMapping';

function Organization({ personDetails = {}, detailsLoading }) {
	const { t } = useTranslation(['profile']);

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
					<Button onClick={handleReset}>{t('profile:reset_button')}</Button>
				</div>

			</div>

			{(!isEmpty(hierarchy?.reporting_managers)
				|| (!isEmpty(hierarchy?.user))) && (
					<Reporting
						user={hierarchy?.user}
						reporting_managers={hierarchy?.reporting_managers}
						params={params}
						setParams={setParams}
					/>
			)}

			{!isEmpty(hierarchy?.reportees) && (
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
