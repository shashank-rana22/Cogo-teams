const STATUS_LIST = ['LOCKED', 'ON_HOLD'];

const isDisabled = (status?:string) => STATUS_LIST.includes(status);

export default isDisabled;
