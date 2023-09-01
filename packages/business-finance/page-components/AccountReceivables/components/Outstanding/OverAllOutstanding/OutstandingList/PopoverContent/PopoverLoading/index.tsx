import styles from './styles.module.css';

interface Props {
	containerHeight?: string,
}
function PopoverLoader({ containerHeight = '' }: Props) {
	return (
		<div className={styles.container} style={{ '--container-height': containerHeight } as React.CSSProperties}>
			<div className={styles.loading_text}>Fetching... 🚀</div>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-spinner.svg"
				alt="src"
				height={22}
				width={22}
			/>
		</div>
	);
}

export default PopoverLoader;
