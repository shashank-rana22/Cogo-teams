/* eslint-disable import/no-unresolved */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// eslint-disable-next-line import/no-unresolved
export { default } from '@cogoport/payroll/page-components/TaxCalculator';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
