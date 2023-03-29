import React from 'react';

import EmptyState from '../../../../../../commons/EmptyStateDocs';
import PopoverLoader from '../PopoverLoading';

import Reportees from './Reportees';
import Reporting from './Reporting';
import styles from './styles.module.css';

interface Data {
	reporting_managers?:object[],
	user?:object,
	reportees?:object[],
}

interface Props {
	data?:Data,
	loading?:boolean,
}

function Organization({ data = {}, loading }:Props) {
	const { reporting_managers:reportingManagers = [], user = {}, reportees = [] } = data;

	if (loading) {
		return <PopoverLoader />;
	}

	if (Object.keys(data || {}).length === 0) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			{((reportingManagers || []).length > 0
			|| Object.keys(user || {}).length > 0) && (
				<Reporting user={user} reportingManagers={reportingManagers} />
			)}

			{(reportees || []).length > 0 && <Reportees reportees={reportees} />}
		</div>
	);
}

export default Organization;
