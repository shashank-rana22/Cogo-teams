import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// eslint-disable-next-line import/no-unresolved, import/extensions
export { default } from '@cogoport/centralised-customer-service/page-components';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
