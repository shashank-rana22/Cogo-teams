import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// eslint-disable-next-line max-len, import/no-unresolved
export { default } from '@cogoport/allocation/page-components/KamExpertise/components/ViewAllConfigurations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'allocation'])),
		},
	};
}
