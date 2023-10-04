import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import NextPage from '../NextPage';

import styles from './styles.module.css';

const OPERATIONAL_ARRAY = [[true, false, false, false, false, false],
	[false, false, false, false, false, false],
	[true, false, false, false, false, false],
	[false, false, false, false, false, false]];

const FINANCIAL_ARRAY = [[true, false, false, false, false, false],
	[false, false, false, false, false, false],
	[true, false, false, false, false, false],
	[false, false, false, false, false, false],
	[false, false, false, false, false, false],
	[false, false, false, false, false, false]];

function Header({ jobId = '' }) {
	const { query: { active_tab = '' }, push = () => {} } = useRouter();
	// console.log('aaaa', router);
	const handleClick = () => {
		if (active_tab === 'financial_close') {
			push(
				'/business-finance/coe-finance/financial_close',
			);
		} else {
			push(
				'/business-finance/coe-finance/operational_close',
			);
		}
	};
	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<Button themeType="secondary" size="md" onClick={handleClick}>Go Back</Button>

				<div className={styles.actions}>
					<Button size="md" themeType="secondary">Hold</Button>
					<Button size="md" themeType="primary">Approve</Button>
				</div>
			</div>
			{(active_tab === 'financial_close')
				? (<NextPage initialArray={FINANCIAL_ARRAY} activeTab={active_tab} jobId={jobId} />)
				: (<NextPage initialArray={OPERATIONAL_ARRAY} jobId={jobId} activeTab={active_tab} />)}
		</div>
	);
}

export default Header;
