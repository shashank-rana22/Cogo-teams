import { useState } from 'react';

import AllUsers from './AllUsers';
import Filter from './Filter';
import UsersGroup from './UsersGroup';

function Users(props) {
	const [selectedItem, setSelectedItem] = useState('Users Group');

	const { date = {}, setDate = () => {} } = props || {};

	return (
		<div>
			<Filter
				selectedItem={selectedItem}
				setSelectedItem={setSelectedItem}
				date={date}
				setDate={setDate}
			/>

			{selectedItem === 'All_Users'
				? <AllUsers {...props} />
				: <UsersGroup date={date} setDate={setDate} />}
		</div>
	);
}

export default Users;
