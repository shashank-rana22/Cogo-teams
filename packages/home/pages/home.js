import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export { default } from '@cogoport/home/page-components/Home';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'home'])),
		},
	};
}
