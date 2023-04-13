import { useState } from 'react';
import { Resizable } from 'react-resizable';

function ListPages() {
	const [state, setState] = useState({
		width  : 500,
		height : 200,
	});

	const onResize = ({ size }) => {
		setState({ width: size.width, height: size.height });
	};

	const { width, height } = state || {};
	return (
		<div>
			<Resizable
				className="box"
				axis="both"
				minConstraints={[200, 200]}
				height={height}
				width={width}
				onResize={onResize}
			>
				<div
					className="box"
					style={{
						width           : `${width}px`,
						height          : `${height}px`,
						backgroundColor : 'lightblue',
					}}
				>
					<span className="text">Welcome to Cogo Page Builder 😛🍻</span>
				</div>
			</Resizable>
		</div>
	);
}
export default ListPages;
