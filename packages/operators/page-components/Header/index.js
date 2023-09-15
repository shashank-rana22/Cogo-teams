import { Button, Input, Tabs, TabPanel } from '@cogoport/components';
import { IcMSearchlight, IcMCross } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';

import { tabs } from '../../configurations/tabs';

import styles from './styles.module.css';

function Header({
	setShow = () => {},
	searchValue = '',
	setSearchValue = () => {},
	activeTab = '',
	setActiveTab = () => {},
}) {
	const { t } = useTranslation(['operators']);
	const tabOptions = tabs(t);
	const setSearchFunc = useCallback(
		(value) => {
			setSearchValue(value);
		},
		[setSearchValue],
	);
	return (
		<header>
			<div className={styles.heading}>
				{t('operators:header_operators_title')}
			</div>
			<div className={styles.container}>
				<Tabs
					themeType="tertiary"
					activeTab={activeTab}
					onChange={setActiveTab}
				>
					{tabOptions.map((item) => {
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
						placeholder={t('operators:header_placeholder_search')}
						type="text"
						size="sm"
					/>
					<Button
						themeType="accent"
						onClick={() => setShow(true)}
					>
						{t('operators:header_create_button')}
					</Button>
				</div>
			</div>
		</header>
	);
}

export default Header;
