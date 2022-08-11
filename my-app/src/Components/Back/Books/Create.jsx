import { useContext, useRef } from "react";
import { useState } from "react";
import getBase64 from "../../../Functions/getBase64";
import BackContext from "../BackContext";



function Create() {
  const { setCreateBook } = useContext(BackContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
 
 
  const fileInput = useRef();
  const [bookCover, setBookCover] = useState(null);
 
  



  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setBookCover(photo))
      .catch((_) => {
        // tylim
      });
  };
  const handleCreate = () => {
    const data = {
      title,
      author,
      photo: bookCover,
      
    };
    setCreateBook(data);
    setTitle("");
    setAuthor("");
    setBookCover(null);
    fileInput.current.value = null;
    
  };

  return (
    <div className="container books-container">
      <div className="row">
        <div className="col-4 ml-1">
          <form className="form">
            <h2>Nauja Knyga</h2>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Knygos pavadinimas"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
         

            <div className="form-row">
              <input
                type="text"
                placeholder="Knygos autorius"
                className="input"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
              />
            </div>
           

            

            <div className="form-row">
              <label>
                Upload Cover Picture
              </label>
              <input
                ref={fileInput}
                type="file"
                className="input"
                onChange={doPhoto}
                
              />
            </div>
            {bookCover ? (
              <div className="photo-bin">
                <img src={bookCover} alt="nice" />
              </div>
            ) : null}
            
            <button type="button" className="btn" onClick={handleCreate}>
              Įkelti knygą
            </button>
          </form>
        </div>
       
      </div>
    </div>
  );
}

export default Create;
