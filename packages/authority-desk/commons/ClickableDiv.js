export default function ClickableDiv(props) {
    const { children, ...rest } = props;
    return <div role='button' tabIndex={0} {...rest} >
        {children}
    </div>
}