import { useState } from 'react';

import Details from './Details';
import InvoicePrefForm from './InvoicePrefForm';

function InvoicePref({ data = [] }) {
	const [showForm, setShowForm] = useState(false);
	return showForm
		? <InvoicePrefForm setShowForm={setShowForm} data={data} showForm={showForm} />
		: <Details data={data} setShowForm={setShowForm} />;
}
export default InvoicePref;
