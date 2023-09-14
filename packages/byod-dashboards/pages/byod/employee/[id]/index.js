/* eslint-disable import/no-unresolved */
import EmployeeData from '@cogoport/byod-dashboards/common/EmployeeDetails';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function EmployeeDetails() {
	return (
		<EmployeeData />
	);
}

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default EmployeeDetails;
