import FullView from './FullView';
import styles from './styles.module.css';

function PreviewDocumet({ document_header,height = '200px' ,width = '200px', preview = false,document_url = ''  }) {
	const
		data = 'https://cogoport-production.sgp1.digitaloceanspaces.com/799b3a3617e7553b143d5c9d85c11154/GST%20Registration%20certificate..pdf';


	return (
		<div className={styles.container}>
			<div
				className={styles.pdf}
				style={{
					minWidth  : '200px',
					minHeight : '200px',
				}}
			>
				<object
					data={document_url}
					type="application/pdf"
					// height="200px"
					// width="200px"
					style={{height,width}}
				>
					<a href={document_url}>
						{document_header}

					</a>
				</object>
				{
					preview &&<FullView
					containerStyle={{
						position : 'absolute',
						bottom   : 8,
						left     : 16,
						right    : 16,
					}}
					url={document_url}
				/>
				}
			</div>

		</div>
	);
}

export default PreviewDocumet;
