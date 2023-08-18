/* eslint-disable import/no-unresolved */
import ManagerDashboard from '@cogoport/manager-dashboard/page-components/ManagerDashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default ManagerDashboard;
