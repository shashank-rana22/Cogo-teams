import Details from './Details';

function Additional({ data = [] }) {
	return (
		<div>
			<div>
				<Details data={data} />
			</div>
		</div>
	);
}
export default Additional;
