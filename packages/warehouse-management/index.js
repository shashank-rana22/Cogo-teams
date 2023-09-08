import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export { default as WarehouseManagement } from './page-components';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
