import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// eslint-disable-next-line import/no-unresolved, max-len
export { default } from '@cogoport/performance-and-incentives/page-components/Plans/components/ScoringPlans/CreateScoringPlan';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
