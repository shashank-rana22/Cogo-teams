import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export { default } from
	'@cogoport/business-finance/page-components/AccountReceivables/components/Outstanding/ViewOrganizationDetails';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'accountRecievables'])),
		},
	};
}
