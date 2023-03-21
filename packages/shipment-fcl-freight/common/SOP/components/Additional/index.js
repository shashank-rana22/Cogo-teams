import { useState } from 'react';

import AdditionalForm from './AdditionalForm';
import Details from './Details';

function Additional({ data = [] }) {
	const [showForm, setShowForm] = useState(false);

	return showForm ? <AdditionalForm setShowForm={setShowForm} />
		: <Details data={data} setShowForm={setShowForm} />;
}
export default Additional;
