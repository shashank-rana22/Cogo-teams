// eslint-disable-next-line import/no-unresolved
import AccuracyDashboard from '@cogoport/chakravyuh/page-components/AccuracyDashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default AccuracyDashboard;
