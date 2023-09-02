// eslint-disable-next-line import/no-unresolved
import Configuration from '@cogoport/byod-dashboards/page-components/AdminDashboard/Configuration';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default Configuration;
