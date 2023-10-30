import styles from './styles.module.css';

function Watermark({ text = 'watermark', rotateAngle = '0deg' }) {
	return (
		<div className={styles.watermark_flex}>
			<h1
				className={styles.watermark_text}
				style={{ transform: `rotate3d(0,0,1, ${rotateAngle})`, userSelect: 'none' }}
			>
				{text}
			</h1>
		</div>
	);
}

export default Watermark;
