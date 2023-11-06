import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../common/EmptyState';

import CustomHandlingFeeListItem from './CustomHandlingFeeListItem';
import styles from './styles.module.css';

const LAST_INDEX = 1;

function CustomHandlingFeesList({
	data = {}, loading = false, setSelectedCustomConfig = () => { },
	setShowCustomConfigForm = () => {}, setOrganizationDetails = () => {},
}) {
	const list = data?.custom_configuration_data || [];

	if (loading) {
		return (
			<div className={styles.spinner}>
				<Loader
					themeType="primary"
				/>
			</div>
		);
	}

	if (isEmpty(list)) {
		return <EmptyState />;
	}

	return list.map((item, i) => (
		<CustomHandlingFeeListItem
			key={item.id}
			data={item}
			isLastItem={i === list.length - LAST_INDEX}
			setShowCustomConfigForm={setShowCustomConfigForm}
			setOrganizationDetails={setOrganizationDetails}
			setSelectedCustomConfig={setSelectedCustomConfig}
		/>
	));
}

export default CustomHandlingFeesList;
