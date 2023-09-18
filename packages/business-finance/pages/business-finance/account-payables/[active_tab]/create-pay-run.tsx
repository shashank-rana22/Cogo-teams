import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export { default } from '@cogoport/business-finance/page-components/AccountPayables/Invoices/CreatePayrun';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
