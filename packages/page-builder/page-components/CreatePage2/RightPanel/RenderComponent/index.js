/* eslint-disable import/no-cycle */
import ButtonComponent from '../../../../commons/widgets/ButtonComponent';
import CarouselComponent from '../../../../commons/widgets/CarouselComponent';
import FormComponent from '../../../../commons/widgets/FormComponent';
import HtmlComponent from '../../../../commons/widgets/HtmlComponent';
import ImageComponent from '../../../../commons/widgets/ImageComponent';
import TextComponent from '../../../../commons/widgets/TextComponent';
import VideoComponent from '../../../../commons/widgets/VideoComponent';

const componentMapping = {
	text     : TextComponent,
	button   : ButtonComponent,
	image    : ImageComponent,
	video    : VideoComponent,
	html     : HtmlComponent,
	form     : FormComponent,
	carousel : CarouselComponent,
};

function RenderComponents({
	componentType,
	widget,
	components,
	setComponents,
	elementId,
	childId,
	selectedRow,
	setSelectedItem,
	index,
	setChildId,
}) {
	console.log('skdoks', widget);
	const componentPropsMapping = {
		text: {
			key: elementId,
			widget,
			components,
			setComponents,
			childId,
			selectedRow,
			elementId,
		},

		image: {
			key: elementId,
			widget,
			components,
			setComponents,
			childId,
			selectedRow,
		},

		button: {
			key: elementId,
			widget,
			components,
			setComponents,
			elementId,
		},

		video: {
			key: elementId,
			widget,
			components,
			setComponents,
			childId,
			selectedRow,
		},

		html: {
			key  : elementId,
			html : widget.content,
		},

		form: {
			key: elementId,
			components,
			setComponents,
			selectedRow,
			childId,
			widget,
		},

		carousel: {
			widget,
			selectedRow,
			components,
			setComponents,
			setChildId,
			setSelectedItem,
			childId,
		},
	};

	const Component = componentMapping[componentType];

	return (
		<div
			key={elementId}
			role="presentation"
			onClick={() => setSelectedItem({ ...widget, index })}
			style={{ width: '100%', height: '100%', color: '#222' }}
		>
			<Component key={componentType} {...(componentPropsMapping[componentType] || {})} />
		</div>
	);
}

export default RenderComponents;
