/* eslint-disable import/no-unresolved */
import AdminDashboard from '@cogoport/byod-dashboards/page-components/AdminDashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default AdminDashboard;
