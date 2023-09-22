import { Button, Select } from '@cogoport/components';
import { IcMArrowLeft } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import VIEW_OPTIONS from '../../configurations/view-type-options';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const [view, setView] = useState('locations');

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

			<div className={styles.actions_container}>
				<Select value={view} onChange={setView} options={VIEW_OPTIONS} />

				<Button
					type="button"
					size="lg"
					themeType="secondary"
					onClick={() => router.back()}
					style={{ marginLeft: '12px' }}
				>
					<IcMArrowLeft height={20} width={20} style={{ marginRight: '4px' }} />
					Admin View
				</Button>
			</div>
		</div>
	);
}

export default Header;
