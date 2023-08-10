import FullView from './FullView';
import styles from './styles.module.css';

function PreviewDocument({
	height = '200px', width = '200px',
	preview = false,
	document_url = '',
	id,
	policy_data,
	getEmployeeDetails,
	employeeId,
}) {
	return (
		<div className={styles.pdf}>
			<object
				data={document_url}
				type="application/pdf"
				style={{ height, width }}
			>
				<p>
					Your web browser doesn&apos;t have a PDF plugin.
					Instead you can
					{' '}
					<a href={document_url}>
						click here to
						download the PDF file.
					</a>
				</p>
			</object>

			{preview && (
				<FullView
					containerStyle={{
						position : 'absolute',
						bottom   : 8,
						left     : 16,
						right    : 16,
					}}
					url={document_url}
					id={id}
					policy_data={policy_data}
					getEmployeeDetails={getEmployeeDetails}
					employeeId={employeeId}
				/>
			)}
		</div>
	);
}

export default PreviewDocument;
