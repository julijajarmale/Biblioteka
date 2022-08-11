import { useRef } from "react";
import { useEffect, useState, useContext } from "react";
import getBase64 from "../../../Functions/getBase64";
import BackContext from "../BackContext";

function Edit() {
  const { modalBook, setEditBook, setModalBook } =
    useContext(BackContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState('');
 
  const fileInput = useRef();
  const [bookCover, setBookCover] = useState(null);
  

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setBookCover(photo))
      .catch((_) => {
       
      });
  };

  useEffect(() => {
    if (null === modalBook) {
      return;
    }

    setTitle(modalBook.title);
    setAuthor(modalBook.author);
    setBookCover(modalBook.photo);
    
  }, [modalBook]);

  const handleEdit = () => {
  

    const data = {
      title,
      id: modalBook.id,
      author,
      photo: bookCover
      
    };
console.log('data', data)
    setEditBook(data);
    setModalBook(null);
  };

  if (null === modalBook) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-header">
        <h2 className="modal-title">Redaguoti knygos informaciją</h2>
        <button
          type="button"
          className="close"
          onClick={() => setModalBook(null)}
        >x</button>
      </div>
      <div className="form modal-body">
        <div className="form-row">
          <label>Pavadinimas:</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
       
        </div>
        <div className="form-row">
          <label>Autorius:</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
       
        
      
      <div className="form-row">
        <label>Viršelis</label>
        <input
          ref={fileInput}
          type="file"
          className="input"
          onChange={doPhoto}
        />
      </div>
      <div>
        {bookCover ? (
          <div className="book-cover">
            <img src={bookCover} alt="nice" />
          </div>
        ) : null}
      </div>
      

      <div className="buttons">
        <button
          type="button"
          className="btn btn2"
          onClick={() => setModalBook(null)}
        >
          Close
        </button>
        <button type="button" className="btn btn3" onClick={handleEdit}>
          Save changes
        </button>
      </div>
    </div>
    
    
  );
}

export default Edit;
