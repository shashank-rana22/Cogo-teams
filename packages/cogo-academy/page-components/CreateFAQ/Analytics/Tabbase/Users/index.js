import { useState } from 'react';

import AllQuestionCardView from './AllUsers';
import Filter from './Filter';
import AllTopicCardView from './UsersGroup';

function Users({ props }) {
	const [selectedItem, setSelectedItem] = useState('All_Users');

	return (
		<div>
			<Filter selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
			{selectedItem === 'All_Users' ? <AllQuestionCardView {...props?.data} />
				: <AllTopicCardView />}
		</div>
	);
}

export default Users;
