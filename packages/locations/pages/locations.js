import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// eslint-disable-next-line import/no-unresolved
export { default } from '@cogoport/locations/page-components/Locations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'locations'])),
		},
	};
}
