import { Button, Input } from '@cogoport/components';
import { IcMSearchlight, IcMCross } from '@cogoport/icons-react';
import React, { useCallback } from 'react';

import styles from './styles.module.css';

function Header({ setShow, searchValue, setSearchValue }) {
	const setSearchFunc = useCallback(
		(value) => {
			setSearchValue(value);
		},
		[],
	);
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Operators</div>
			<div className={styles.right}>
				<Input
					prefix={<IcMSearchlight className="search-icon" />}
					suffix={(
						<IcMCross
							className="cross-icon"
							onClick={() => setSearchValue('')}
							style={{ cursor: 'pointer' }}
						/>
					)}
					className={styles.input_search}
					style={{ width: '260px', marginInline: '10px', height: '26px' }}
					onChange={setSearchFunc}
					value={searchValue}
					placeholder="Search"
					type="text"
				/>
				<Button onClick={() => setShow(true)}>+ Create</Button>
			</div>
		</div>
	);
}

export default Header;
