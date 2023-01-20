// eslint-disable-next-line import/no-unresolved
import LoginComponent from '@cogoport/authentication/page-components/Login';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'login'])),
			layout: 'hidden',
		},
	};
}

export default LoginComponent;
