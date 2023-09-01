/* eslint-disable import/no-unresolved */
import EmployeeList from '@cogoport/byod-dashboards/page-components/EmployeeList';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

function Employee() {
	return (
		<EmployeeList />
	);
}

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default Employee;
