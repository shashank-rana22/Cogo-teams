// eslint-disable-next-line import/no-unresolved
import CargoInsuranceCheckout from '@cogoport/cargo-insurance/page-components/Checkout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'cargoInsurance'])),
		},
	};
}

export default CargoInsuranceCheckout;
