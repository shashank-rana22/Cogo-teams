import { Input, Select, Popover, Button } from '@cogoport/components';
import { IcMAppSearch, IcMDoubleFilter } from '@cogoport/icons-react';
import React from 'react';

import { SORT_OPTIONS } from '../utils/constants';

import styles from './styles.module.css';

function Filters() {
	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.total_employees}>
					Total No. of Employees :
					{' '}
					<span className={styles.employee_no}>812</span>
				</div>
				<Input
					size="md"
					className={styles.search_input}
					suffix={<IcMAppSearch className={styles.search_icon} width={20} height={20} />}
					placeholder="Search via COGO-ID or Employee Name"
				/>
			</div>
			<div className={styles.right_container}>
				<Select className={styles.sort_by} placeholder="Sort by" options={SORT_OPTIONS} />
				<Popover placement="bottom" render="bottom">
					<Button size="lg" themeType="secondary" className={styles.filters}>
						<div className={styles.flex}>
							<span className={styles.filter_text}>
								Filter
							</span>
							<IcMDoubleFilter />
						</div>
					</Button>
				</Popover>
				<Popover placement="bottom" render="bottom">
					<Button size="lg" themeType="secondary">
						<div className={styles.flex}>
							<span className={styles.filter_text}>
								Filter
							</span>
							<IcMDoubleFilter />
						</div>
					</Button>
				</Popover>
			</div>
		</div>
	);
}

export default Filters;
