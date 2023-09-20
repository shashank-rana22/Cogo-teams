import { Button, Popover } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Header() {
	const { push } = useRouter();

	const { user } = useSelector(({ profile }) => profile);

	const [showFilters, setShowFilters] = useState(false);
	const [period, setPeriod] = useState('Month');

	return (
		<div className={styles.head_container}>
			<div>
				<h2 className={styles.heading}>
					Welcome,
					{' '}
					{user.name}
				</h2>

				<div className={styles.subheading}>
					<div>
						You are viewing Incentive and Scoring Analytics
						{' '}
						<span className={styles.light}>for</span>
						{' '}
						<i>Cogo India</i>
					</div>

					<div className={styles.container}>
						<Popover
							theme="light"
							interactive
							animation="perspective"
							placement="bottom"
							caret={false}
							content={(
								<FilterContent
									period={period}
									setPeriod={setPeriod}
									setShowFilters={setShowFilters}
								/>
							)}
							visible={showFilters}
							onClickOutside={() => setShowFilters(false)}
						>

							<Button
								size="md"
								themeType="secondary"
								onClick={() => {
									setShowFilters((prev) => !prev);
								}}
							>
								{period}
								<IcMArrowDown
									width={14}
									height={14}
									style={{ marginLeft: '6px' }}
									className={showFilters ? styles.rotate : ''}
								/>

							</Button>

						</Popover>
					</div>
				</div>

			</div>

			<div className={styles.button_container}>
				<Button
					type="button"
					size="lg"
					themeType="secondary"
					style={{ marginRight: '12px' }}
					onClick={() => push('/performance-and-incentives/public-leaderboard')}
				>
					Public View Mode
				</Button>

				<Button
					type="button"
					size="lg"
					themeType="secondary"
				>
					Across All
				</Button>
			</div>
		</div>
	);
}

export default Header;
