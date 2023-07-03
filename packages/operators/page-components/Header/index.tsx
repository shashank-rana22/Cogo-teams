import { Button, Input } from '@cogoport/components';
import { IcMSearchlight, IcMCross } from '@cogoport/icons-react';
import React, { useCallback } from 'react';

import styles from './styles.module.css';

const TABS = [
	{
		key   : 'airline',
		label : 'AIRLINE',
	},
	{
		key   : 'shipping_line',
		label : 'SHIPPING LINE',
	},
	{
		key   : 'others',
		label : 'OTHERS',
	},
];

function Header({ setShow, searchValue, setSearchValue, activeTab, setActiveTab }) {
	const setSearchFunc = useCallback(
		(value) => {
			setSearchValue(value);
		},
		[setSearchValue],
	);
	return (
		<header>
			<div className={styles.heading}>Operators</div>
			<div className={styles.container}>
				<div className={styles.flex}>
					{TABS.map((tab) => (
						<div
							key={tab.key}
							onClick={() => {
								setActiveTab(tab.key);
							}}
							role="presentation"
						>
							<div
								className={`${styles.container_click} 
								${tab.key === activeTab ? styles.sub_container_click : styles.sub_container}`}
							>
								{tab.label}
							</div>

						</div>
					))}
				</div>
				<div className={styles.right}>
					<Input
						suffix={(
							searchValue ? (
								<IcMCross
									className="cross_icon"
									onClick={() => setSearchValue('')}
									style={{ cursor: 'pointer' }}
								/>
							) : (
								<IcMSearchlight className="search_icon" />
							)
						)}
						className={styles.input_search}
						style={{ width: '260px', marginInline: '10px', height: '26px' }}
						onChange={setSearchFunc}
						value={searchValue}
						placeholder="Search"
						type="text"
					/>
					<Button themeType="accent" onClick={() => setShow(true)}>+ Create</Button>
				</div>
			</div>
		</header>
	);
}

export default Header;
