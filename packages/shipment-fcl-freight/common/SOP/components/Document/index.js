import { useState } from 'react';

import Details from './Details';
import DocumentForm from './DocumentForm';

function Document({ data = [] }) {
	const { sop_detail = {} } = data[0] || {};
	const [showForm, setShowForm] = useState(false);

	return showForm
		? <DocumentForm sop_detail={sop_detail} setShowForm={setShowForm} />
		: <Details sop_detail={sop_detail} setShowForm={setShowForm} />;
}
export default Document;
