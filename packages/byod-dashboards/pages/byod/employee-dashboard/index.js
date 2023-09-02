/* eslint-disable import/no-unresolved */
import EmployeeDashboard from '@cogoport/byod-dashboards/page-components/EmployeeDashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default EmployeeDashboard;
