import Details from './Details';

function Document({ data = [] }) {
	return (
		<div>
			<div>
				<Details data={data} />
			</div>

		</div>
	);
}
export default Document;
