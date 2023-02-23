import { Pill } from '@cogoport/components';
import React from 'react';

import useListFaqTag from '../../hooks/useListFaqTag';

function PopularTags() {
	const {
		refetchTag = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useListFaqTag();

	console.log(data);

	return (

		<div>
			<br />
			<h4>Popular tags in this section:</h4>
			{data?.list.map((item) => (
				<Pill
					// onClick={<AllFAQ />}
					key={item.name}
					size="xl"
					color="white"
				>
					{item.name}
				</Pill>
			))}
		</div>
	);
}

export default PopularTags;
