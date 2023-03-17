import { useState } from 'react';

import AllUsers from './AllUsers';
import Filter from './Filter';
import AllTopicCardView from './UsersGroup';

function Users({ props }) {
	const [selectedItem, setSelectedItem] = useState('Users Group');

	return (
		<div>
			<Filter selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
			{selectedItem === 'All_Users' ? <AllUsers {...props?.data} />
				: <AllTopicCardView />}
		</div>
	);
}

export default Users;
