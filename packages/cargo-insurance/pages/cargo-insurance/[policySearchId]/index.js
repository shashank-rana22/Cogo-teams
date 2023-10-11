// eslint-disable-next-line import/no-unresolved
import CargoInsurance from '@cogoport/cargo-insurance/page-components/Main';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'cargoInsurance'])),
		},
	};
}

export default CargoInsurance;
