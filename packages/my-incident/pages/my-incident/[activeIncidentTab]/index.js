import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export { default } from '@cogoport/my-incident/page-components/MyIncident';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
