/* eslint-disable import/no-unresolved */
import Separation from '@cogoport/attendance-leave-management/page-components/Separation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default Separation;
