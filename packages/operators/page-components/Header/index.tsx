import { Button, Input, Tabs, TabPanel } from '@cogoport/components';
import { IcMSearchlight, IcMCross } from '@cogoport/icons-react';
import React, { useCallback } from 'react';

import styles from './styles.module.css';

const TABS = [
	{
		key   : 'airline',
		label : 'Airline',
	},
	{
		key   : 'shipping_line',
		label : 'Shipping Line',
	},
	{
		key   : 'others',
		label : 'Others',
	},
];

interface HeaderProps {
	setShow?: (p:boolean)=>void,
	searchValue?: string;
	setSearchValue?: (p:string)=>void,
	activeTab?: string;
	setActiveTab?: (p:string)=>void,
}

function Header({
	setShow = () => {},
	searchValue = '',
	setSearchValue = () => {},
	activeTab = '',
	setActiveTab = () => {},
}:HeaderProps) {
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
				<Tabs
					themeType="tertiary"
					activeTab={activeTab}
					onChange={setActiveTab}
				>
					{TABS.map((item) => {
						const { key = '', label = '' } = item;
						return (
							<TabPanel
								key={key}
								name={key}
								title={label}
							/>
						);
					})}
				</Tabs>
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
						onChange={setSearchFunc}
						value={searchValue}
						placeholder="Search"
						type="text"
						size="sm"
					/>
					<Button themeType="accent" onClick={() => setShow(true)}>+ Create</Button>
				</div>
			</div>
		</header>
	);
}

export default Header;
