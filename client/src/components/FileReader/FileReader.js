import {useEffect, useRef} from "react";
import axios from "axios";

const FileReader = () => {
    const isEffectExecuted = useRef(false);
    useEffect(() => {
        axios.get('http://localhost:3001/files/small_arms/awdawd', {responseType: 'blob'}).then(response => {
            if (response.status === 200) {
                const file = new Blob([response.data], {type: 'application/pdf'});
                const fileURL = URL.createObjectURL(file);
                if (isEffectExecuted.current) {//we need to open only one time, but because of rerender we call useEffect again and file opens twice
                    window.open(fileURL);
                }
            }
            isEffectExecuted.current = true;
        })

    }, []);
    return <div>
        <button
            onClick={() => axios.get('http://localhost:3001/files/small_arms').then(response => console.log(response))}>CLICK
        </button>
        {/*<input*/}
        {/*    type="file"*/}
        {/*    accept=".pdf"*/}
        {/*    multiple*/}
        {/*    onChange={(el) => {*/}
        {/*        console.log(Array.from(el.target.files))*/}
        {/*        el.target.files?.length &&*/}
        {/*        setSelectedDocs(Array.from(el.target.files))*/}
        {/*    }}*/}
        {/*/>*/}
        {/*<DocViewer*/}
        {/*    documents={selectedDocs.map((file) => ({*/}
        {/*        uri: window.URL.createObjectURL(file),*/}
        {/*        fileName: file.name,*/}
        {/*    }))}*/}
        {/*/>*/}

        {/*<Document file={selectedDocs} onLoadSuccess={onDocumentLoadSuccess}>*/}
        {/*    {Array.from(new Array(numPages), (el, index) => (*/}
        {/*        <Page key={`page_${index + 1}`} pageNumber={index + 1}/>*/}
        {/*    ))}*/}
        {/*</Document>*/}
        {/*{fileUrl && (*/}
        {/*    <Document file={fileUrl}>*/}
        {/*        <Page pageNumber={1}/>*/}
        {/*    </Document>*/}
        {/*)}*/}
    </div>
}

export default FileReader