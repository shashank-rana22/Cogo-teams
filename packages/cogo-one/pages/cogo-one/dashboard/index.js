import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

/* eslint-disable import/no-unresolved */
export { default } from '@cogoport/cogo-one/page-components/CogoOneDashboard';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
