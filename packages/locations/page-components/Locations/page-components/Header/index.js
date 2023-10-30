import { Button, Toggle } from '@cogoport/components';
import { useHandleVersionChangeToOld } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Filter from '../Filters';

import styles from './styles.module.css';

function Header({ setFilters = () => {}, filters = {}, setSideBar = () => {} }) {
	const { t } = useTranslation(['locations']);
	const { handleRouteChange } = useHandleVersionChangeToOld({});

	return (
		<div className={styles.header_container}>
			<h1>{t('locations:locations_heading')}</h1>

			<div className={styles.btn_align}>
				<Filter setFilters={setFilters} filters={filters} activeTab={filters.type} />

				<Button
					onClick={() => setSideBar('create')}
					className={styles.create}
				>
					{t('locations:create_location')}

				</Button>

				<Toggle
					size="md"
					onLabel="Old"
					offLabel="New"
					onChange={handleRouteChange}
				/>
			</div>
		</div>
	);
}

export default React.memo(Header);
