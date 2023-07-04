import Body from './Body';
import Header from './Header';

function ListObjectives(props) {
	const { ...rest } = props;

	return (
		<>
			<Header {...rest} />

			<Body {...rest} />
		</>
	);
}

export default ListObjectives;
