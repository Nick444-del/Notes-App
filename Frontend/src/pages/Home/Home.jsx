import React, { useState, useEffect } from 'react'
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import axiosInstance from '../../utils/axiosInstance'
import AddEditNotes from './AddEditNotes'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    })

    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);

    const navigate = useNavigate();

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/getuser")
            if(response.data && response.data.user){
                setUserInfo(response.data.user)
            }
        } catch (error) {
            if(error.response.status === 401){
                localStorage.clear();
                navigate("/login")
            }
        }
    }

    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/getallnotes")
            if(response.data && response.data.notes){
                setAllNotes(response.data.notes)
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again")
        }
    }

    useEffect(() => {
        getAllNotes();
        getUserInfo();
    }, [])


    return (
        <>
            <Navbar userInfo={userInfo} />
            <div className='container mx-auto'>
                <div className='grid sm:grid-cols-3 gap-4 mt-8 p-2 grid-cols-1'>
                    <NoteCard title="Meeting on 7th April" date="3rd Apr 2024" content="Meeting on 7th April" tags="#meeting" isPinned={true} onEdit={() => { }} onDelete={() => { }} onPinNote={() => { }} />
                </div>
            </div>

            <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-apricot hover:bg-light_tan fixed right-10 bottom-10 transition-all ease-in-out hover:text-apricot' onClick={() => {
                setOpenAddEditModal({ isShown: true, type: "add", data: null })
            }}>
                <MdAdd className='text-[32px] text-white' />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                }}
                contentLabel=''
                className="w-[40%] max-h-3/4 bg-apricot rounded-md mx-auto mt-14 p-5 overflow-auto"
            >
                <AddEditNotes type={openAddEditModal.type} notedata={openAddEditModal.data} onClose={() => { setOpenAddEditModal({ isShown: false, type: "add", data: null }) }} />
            </Modal>
        </>
    )
}

export default Home