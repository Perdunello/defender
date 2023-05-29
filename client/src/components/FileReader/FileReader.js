import DocViewer from "react-doc-viewer";
import {useState} from "react";

const FileReader = () => {
    const [fileContent, setFileContent] = useState('');
    const handleFiles = (e) => {
        setFileContent(e.target.files[0])
        console.log(e.target.files[0])
    }

    return <div>
        <div>
            <input type="file" onChange={handleFiles}/>
            <button>Очистить</button>
        </div>
        {/*{fileContent && <DocViewer documents={fileContent}/>}*/}

    </div>
}

export default FileReader