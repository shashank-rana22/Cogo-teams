const getRequiredControl = ({ controls = [], name = '' }) => controls.find((item) => item.name === name);

export default getRequiredControl;
