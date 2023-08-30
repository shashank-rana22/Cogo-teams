/* eslint-disable import/no-unresolved */
import EmployeeDashboard from '@cogoport/employee-dashboard/page-components/Dashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default EmployeeDashboard;

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
