import Details from './Details';

function InvoicePref({ data = [] }) {
	return (
		<div>
			<div><Details data={data} /></div>
		</div>
	);
}
export default InvoicePref;
