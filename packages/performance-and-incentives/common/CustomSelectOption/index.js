import Quests from './Quests';

const OPTIONS_MAPPING = {
	quests: Quests,
};

function CustomSelectOption({ key = '', option = {}, ...rest }) {
	const CustomOptions = OPTIONS_MAPPING[key];

	return <CustomOptions data={option} {...rest} />;
}

export default CustomSelectOption;
