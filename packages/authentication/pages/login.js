// eslint-disable-next-line import/no-unresolved
import LoginComponent from '@cogoport/authentication/page-components/Login';

export async function getServerSideProps() {
	return {
		props: {
			layout: 'hidden',
		},
	};
}

export default LoginComponent;
