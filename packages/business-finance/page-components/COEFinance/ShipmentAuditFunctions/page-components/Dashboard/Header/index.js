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
	const { push } = useRouter();
	const handleClick = () => {
		if (activeTab === 'financial_close') {
			push(
				'/business-finance/coe-finance/financial_close',
				'/business-finance/coe-finance/financial_close',
			);
		} else {
			push(
				'/business-finance/coe-finance/operational_close',
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
			{!(activeTab === 'financial_close')
				? (<NextPage initialArray={OPERATIONAL_ARRAY} jobId={jobId} />)
				: (<NextPage initialArray={FINANCIAL_ARRAY} activeTab={activeTab} jobId={jobId} />)}
		</div>
	);
}

export default Header;
