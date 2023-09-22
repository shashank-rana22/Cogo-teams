import { Button } from '@cogoport/components';
import { IcMArrowLeft } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	return (
		<div className={styles.container}>
			<div>
				<h2 className={styles.heading}>Scoring</h2>
				<p className={styles.sub_heading}>
					for
					{' '}
					<i>
						<b>SME Owners</b>
						{' '}
						(Team Contributions)
					</i>
				</p>
			</div>

			<div>
				<Button
					type="button"
					size="lg"
					themeType="secondary"
					onClick={() => router.back()}
				>
					<IcMArrowLeft height={20} width={20} style={{ marginRight: '4px' }} />
					Admin View
				</Button>
			</div>
		</div>
	);
}

export default Header;
