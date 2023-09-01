// eslint-disable-next-line import/no-unresolved
import FeedbackDashboard from '@cogoport/chakravyuh/page-components/feedbackDashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default FeedbackDashboard;
