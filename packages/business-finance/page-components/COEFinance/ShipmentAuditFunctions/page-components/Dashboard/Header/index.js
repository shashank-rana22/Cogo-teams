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

function Header({ activeTab = '', jobId = '' }) {
	const router = useRouter();
	const handleClick = () => {
		if (activeTab === 'financial_close') {
			router.push(
				'/business-finance/coe-finance/financial_close',
			);
		} else {
			router.push(
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
			{(activeTab === 'financial_close')
				? (<NextPage initialArray={FINANCIAL_ARRAY} activeTab={activeTab} jobId={jobId} />)
				: (<NextPage initialArray={OPERATIONAL_ARRAY} jobId={jobId} activeTab={activeTab} />)}
		</div>
	);
}

export default Header;
