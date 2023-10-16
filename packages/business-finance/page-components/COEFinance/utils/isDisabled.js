const STATUS_LIST = ['LOCKED', 'ON_HOLD'];

const isDisabled = (status) => STATUS_LIST.includes(status);

export default isDisabled;
