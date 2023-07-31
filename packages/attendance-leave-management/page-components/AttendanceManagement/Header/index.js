import { Button, Select } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const OPTIONS = [
	{ label: 'January 2023', value: 'january' },
	{ label: 'February 2023', value: 'february' },
	{ label: 'March 2023', value: 'march' },
];

function Header({ selectMonth, setSelectMonth }) {
	return (
		<div className={styles.main_container}>
			<div>
				<div className={styles.header}>
					Welcome back, Aditya!
				</div>
				<div className={styles.sub_header}>
					Let’s see your attendance for
					{' '}
					{startCase(selectMonth)}
				</div>
			</div>

			<div className={styles.select_button}>
				<div className={styles.select_wrapper}>
					<Select
						placeholder="Select Month"
						options={OPTIONS}
						onChange={(item) => setSelectMonth(item)}
						value={selectMonth}
					/>
				</div>

				<Button themeType="secondary" size="lg">
					<span style={{ paddingRight: 10 }}>
						Download Report
					</span>
					<IcMDownload />
				</Button>

			</div>

		</div>
	);
}
export default Header;
