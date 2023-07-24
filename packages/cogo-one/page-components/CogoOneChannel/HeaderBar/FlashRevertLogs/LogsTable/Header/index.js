import { Input, ButtonIcon } from '@cogoport/components';
import { IcMDelete, IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import Filters from './Filters';
import styles from './styles.module.css';

function Header({
	sidQuery = '',
	filtersParams = {},
	setSidQuery = () => {},
	setFilterParams = () => {},
}) {
	return (
		<div className={styles.header}>
			<Input
				size="sm"
				value={sidQuery || ''}
				placeholder="Search sid no..."
				className={styles.input_container}
				onChange={setSidQuery}
				prefix={<IcMSearchlight className={styles.search_icon} />}
				suffix={sidQuery
					? (
						<ButtonIcon
							size="sm"
							icon={<IcMDelete />}
							disabled={false}
							themeType="primary"
							onClick={() => setSidQuery('')}
						/>
					) : null}
			/>

			<Filters
				filtersParams={filtersParams}
				setFilterParams={setFilterParams}
			/>
		</div>
	);
}

export default Header;
