import ButtonComponent from '../../../../commons/widgets/ButtonComponent';
import FormComponent from '../../../../commons/widgets/FormComponent';
import HtmlComponent from '../../../../commons/widgets/HtmlComponent';
import ImageComponent from '../../../../commons/widgets/ImageComponent';
import TextComponent from '../../../../commons/widgets/TextComponent';
import VideoComponent from '../../../../commons/widgets/VideoComponent';

const componentMapping = {
	text   : TextComponent,
	button : ButtonComponent,
	image  : ImageComponent,
	video  : VideoComponent,
	html   : HtmlComponent,
	form   : FormComponent,
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
}) {
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
			key   : elementId,
			style : widget.style,
			html  : widget.content,
		},

		form: {
			key: elementId,
			components,
			setComponents,
			selectedRow,
			childId,
			widget,
		},
	};

	const Component = componentMapping[componentType];

	return (
		<div
			key={elementId}
			role="presentation"
			onClick={() => {
				console.log('widgetsssssssss ::', widget);
				setSelectedItem({ ...widget, index });
			}}
			style={{ width: '100%', height: '100%', color: '#222' }}
		>
			<Component key={componentType} {...(componentPropsMapping[componentType] || {})} />
		</div>
	);
}

export default RenderComponents;
