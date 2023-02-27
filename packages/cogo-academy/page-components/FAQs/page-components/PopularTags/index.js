import { Button, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useListFaqTag from '../../hooks/useListFaqTag';
import TopicList from '../TopicList';

import styles from './styles.module.css';

function PopularTags({ tabTitle = '', searchState = '' }) {
	const [tags, setTags] = useState([]);
	const {
		refetchTag = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useListFaqTag();
	console.log('efef', tags);
	return (
		<div style={{ marginBottom: 10 }}>
			<h4 style={{ marginTop: 12 }}>
				{startCase('Popular tags in this section')}
				:
			</h4>
			<div>
				{

			data?.list.map((item) => (
				<Pill
					className={styles.tag_decoration}
					key={item.name}
					size="sm"
					color="white"
					onChange={() => setTags([...tags, item.id])}
				>
					<Button
						themeType="tertiary"
						onClick={() => setTags([...tags, item.id])}
						size="sm"
						color="white"
					>
						<div className={styles.font_decoration}>{startCase(item.name)}</div>
					</Button>

				</Pill>

			))
			}

			</div>

			<TopicList tabTitle={tabTitle} searchState={searchState} tagId={tags} />
		</div>
	);
}

export default PopularTags;
