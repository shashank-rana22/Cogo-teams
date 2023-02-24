import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import useListFaqTag from '../../hooks/useListFaqTag';

import styles from './styles.module.css';

function PopularTags() {
	const {
		refetchTag = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useListFaqTag();

	return (
		<div style={{ marginBottom: 12 }}>
			<br />
			<h4>Popular tags in this section:</h4>
			{data?.list.map((item) => (
				<Pill
					className={styles.tag_decoration}
					key={item.name}
					size="sm"
					color="white"
				>
					{startCase(item.name)}
				</Pill>
			))}
		</div>
	);
}

export default PopularTags;
