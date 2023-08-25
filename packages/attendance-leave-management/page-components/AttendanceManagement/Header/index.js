import { Button, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDownload } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({ selectMonth, setSelectMonth, formattedData, loading }) {
	const profile = useSelector((state) => state.profile || {});

	const { user } = profile || {};

	console.log('profile', profile);

	const handleMonthChange = (id, val) => {
		setSelectMonth({
			month : val?.label?.split(' ')[GLOBAL_CONSTANTS.zeroth_index],
			value : id,
		});
	};

	return (
		<div className={styles.main_container}>
			<div>
				<div className={styles.header}>
					Welcome back,
					{' '}
					{user.name || '-'}
					!
				</div>
				<div className={styles.sub_header}>
					Let’s see your attendance for
					{' '}
					{startCase(selectMonth.month)}
				</div>
			</div>

			<div className={styles.select_button}>
				<div className={styles.select_wrapper}>
					{!loading && !isEmpty(selectMonth) && (
						<Select
							placeholder="Select Month"
							options={formattedData}
							onChange={(item, val) => handleMonthChange(item, val)}
							value={selectMonth.value}
						/>
					)}
				</div>

				<Button className={styles.donwload_btn} themeType="secondary" size="lg">
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
