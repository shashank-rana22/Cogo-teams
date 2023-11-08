import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Loader from '../Loader';

import Reportees from './Reportees';
import Reporting from './Reporting';
import styles from './styles.module.css';

function Organization({ data :hierarchy = {}, loading = false, params = {}, setParams = () => {} }) {
	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.container}>
			{(!isEmpty(hierarchy?.reporting_managers?.length)
				|| !isEmpty(Object.keys(hierarchy?.user))) && (
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
