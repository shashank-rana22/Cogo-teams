import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// eslint-disable-next-line import/no-unresolved
export { default } from '@cogoport/demand-forecast/page-components/PageView';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'demandForecast'])),
		},
	};
}
