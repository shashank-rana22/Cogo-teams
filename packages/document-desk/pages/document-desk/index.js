import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

/* eslint-disable import/no-unresolved */
export { default } from '@cogoport/document-desk/page-components';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
