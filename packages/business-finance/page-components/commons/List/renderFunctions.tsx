import FiledPair from './FiledPair';
import RenderStatus from './RenderStatus/index'



const itemFunctions = ({ functions }) => {
	const newFunctions = {
		renderFieldPair: (itemData, field) => (
			<FiledPair item={itemData} field={field} />
		),
        renderStatus: (itemData:any,field:any) => (
            <RenderStatus item={itemData} field={field} />
          )
	};

	return {
		newFunctions,
	};
};

export default itemFunctions;
