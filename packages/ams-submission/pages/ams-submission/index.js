import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// eslint-disable-next-line import/no-unresolved
export { default } from '@cogoport/ams-submission/page-components';

export async function getServerSideProps({ locale = 'en' }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'amsSubmission'])),
		},
	};
}
