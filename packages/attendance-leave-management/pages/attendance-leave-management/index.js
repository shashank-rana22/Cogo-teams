/* eslint-disable import/no-unresolved */
import AttendanceLeaveDashboard from '@cogoport/attendance-leave-management/page-components/Dashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default AttendanceLeaveDashboard;
