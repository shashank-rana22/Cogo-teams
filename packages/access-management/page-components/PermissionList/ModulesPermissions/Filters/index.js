import { Popover, Chips, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import SearchInput from '../../../../common/SearchInput';

import styles from './styles.module.css';

function Filters({
	searchString = '',
	onChangeSearchNavigation = () => {},
	navStatus = {},
	setNavStatus = () => {},
}) {
	const { t } = useTranslation(['accessManagement']);
	const content = (
		<section className={styles.filters_popover_content}>
			<span>{t('accessManagement:roles_and_permission_filters_navigation_status_heading')}</span>
			<Chips
				className={styles.chips_container}
				items={[
					{
						children : t('accessManagement:roles_and_permission_filters_children_assigned'),
						key      : 'assigned',
					},
					{
						children : t('accessManagement:roles_and_permission_filters_children_not_assigned'),
						key      : 'not_assigned',
					},
					{
						children : t('accessManagement:roles_and_permission_filters_children_all_assigned'),
						key      : 'all',
					},
				]}
				selectedItems={navStatus}
				onItemChange={(val) => setNavStatus(val)}
			/>
		</section>
	);
	return (
		<section className={styles.container}>
			<SearchInput
				value={searchString}
				onChange={onChangeSearchNavigation}
				size="md"
				placeholder={t('accessManagement:roles_and_permission_search_navigation_placeholder')}
			/>
			<Popover placement="top" render={content} interactive className={styles.filters_popover}>
				<Button themeType="tertiary" size="lg">
					{t('accessManagement:roles_and_permission_filters_label')}
					{' '}
					<IcMFilter />
				</Button>
			</Popover>
		</section>
	);
}

export default Filters;
