import { getFieldController } from './getFieldController';

function Layout({ controls, control, errors }) {
	return (
		<>
			{controls.map((item) => {
				const Element = getFieldController(item?.type); return 	(
					<div key={item?.name}>
						<Element
							control={control}
							controls={item?.controls}
							name={item?.name}
							error={errors?.[item?.name]}
						/>
					</div>
				);
			})}

		</>
	);
}

export default Layout;
