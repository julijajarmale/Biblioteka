import BackContext from './BackContext';
import Nav from './Nav';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import Admin from './Admin/Admin';
import { useEffect, useState } from 'react';
import BooksCrud from './Books/Crud';


function Back({show}) {
   
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [books, setBooks] = useState(null)
    const [createBook, setCreateBook] = useState(null)
    const [deleteBook, setDeleteBook] = useState(null)
    const [editBook, setEditBook] = useState(null)
    const [modalBook, setModalBook] = useState(null)
    const [reservations, setReservations] = useState(null)
    const [deleteReservation, setDeleteReservation] = useState(null)
    const [approveReservation, setApproveReservation] = useState(null)
    const [extendReservation, setExtendReservation] = useState(null)

   


//READ BOOKS 
useEffect(() => {
    axios.get('http://localhost:3003/admin/books', authConfig())
        .then(res => setBooks(res.data));
}, [lastUpdate]);


//CREATE BOOKS

useEffect(() => {
    if (null === createBook) return;
    axios.post('http://localhost:3003/admin/books', createBook, authConfig())
    .then(res => {
        setLastUpdate(Date.now());
    })
    
}, [createBook]);

//DELETE BOOKS
useEffect(() => {
    if (null === deleteBook) return;
    axios.delete('http://localhost:3003/admin/books/' + deleteBook.id, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
    
}, [deleteBook]);

// EDIT BOOK
useEffect(() => {
        
    if (null === editBook) return;
    axios.put('http://localhost:3003/admin/books/' + editBook.id, editBook, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
       
}, [editBook]);

//READ RESERVATION
useEffect(() => {
    axios.get('http://localhost:3003/admin/reservations', authConfig())
        .then(res => setReservations(res.data));
}, [lastUpdate]);

//DELETE Reservation
useEffect(() => {
    if (null === deleteReservation) return;
    axios.delete('http://localhost:3003/admin/reservations/' + deleteReservation.id, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
    
}, [deleteReservation]);

// EDIT RESERVATION
useEffect(() => {
        
    if (null === approveReservation) return;
    axios.put('http://localhost:3003/admin/reservations/' + approveReservation.id, approveReservation, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
       
}, [approveReservation]);

// EDIT RESERVATION
useEffect(() => {
        
    if (null === extendReservation) return;
    axios.put('http://localhost:3003/admin/reservations/' + extendReservation.id, extendReservation, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
       
}, [extendReservation]);


    return (
        <BackContext.Provider value={{
            setCreateBook,
            books,
            setDeleteBook,
            setEditBook,
            modalBook,
            setModalBook,
            reservations,
            setDeleteReservation,
            setApproveReservation,
            setExtendReservation
           

            
        }}>
              {
                show === 'admin' ?
                    <>
                    
                    <Nav/>
                    <Admin/>
                    
                   
            
                    </>
                    : show === 'books' ? <BooksCrud/>: 
                        null
            }
        </BackContext.Provider>
    )
}
export default Back;