// eslint-disable-next-line import/no-unresolved
import PricingTrends from '@cogoport/chakravyuh/page-components/pricing/trends';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default PricingTrends;
