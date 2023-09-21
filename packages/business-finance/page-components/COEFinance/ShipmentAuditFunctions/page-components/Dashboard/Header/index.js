import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import NextPage from '../NextPage';

import styles from './styles.module.css';

function Header() {
	const { push } = useRouter();
	const handleClick = () => {
		push(
			'/business-finance/coe-finance/operational_close',
			'/business-finance/coe-finance/operational_close',
		);
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
			<NextPage />
		</div>
	);
}

export default Header;
