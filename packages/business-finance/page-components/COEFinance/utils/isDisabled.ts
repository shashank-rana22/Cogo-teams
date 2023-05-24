const isDisabled = (status:string) => status === 'LOCKED' || status === 'ON_HOLD';

export default isDisabled;
