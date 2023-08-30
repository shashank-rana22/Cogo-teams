import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// eslint-disable-next-line import/no-unresolved
export { default } from '@cogoport/allocation/page-components/CRMFeedbackDashboard/Responses';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'allocation'])),
		},
	};
}
