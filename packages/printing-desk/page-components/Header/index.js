import { Input, Tabs, TabPanel, Toggle } from '@cogoport/components';
import { IcMSearchlight, IcMCross } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { tabs } from '../../utils/tabs';
import Filters from '../Filters';

import styles from './styles.module.css';

function Header({
	searchValue = '',
	setSearchValue = () => {},
	activeTab = 'approved_awb',
	setActiveTab = () => {},
	filters = {},
	setFilters = () => {},
	setRelevantToMe = () => {},
}) {
	const { t } = useTranslation(['printingDesk']);
	return (
		<header>
			<div className={styles.heading}>{t('printingDesk:header_printing_desk')}</div>
			<div className={styles.top_container}>
				<Tabs
					themeType="tertiary"
					activeTab={activeTab}
					onChange={setActiveTab}
				>
					{tabs({ t }).map((tab) => {
						const { key = '', label = '' } = tab;
						return (
							<TabPanel
								key={key}
								name={key}
								title={label}
							/>
						);
					})}
				</Tabs>
				<Input
					size="sm"
					value={searchValue}
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
					placeholder={t('printingDesk:header_search_placeholder')}
					type="text"
					onChange={(val) => {
						setSearchValue(val);
					}}
				/>
			</div>
			<div className={styles.filters_container}>
				<Toggle
					name="stakeholder_id"
					size="sm"
					disabled={false}
					onLabel={t('printingDesk:header_toggle_onlabel')}
					offLabel={t('printingDesk:header_toggle_offlabel')}
					onChange={() => setRelevantToMe((prev) => !prev)}
				/>
				<Filters setFilters={setFilters} filters={filters} />
			</div>

		</header>
	);
}

export default Header;
