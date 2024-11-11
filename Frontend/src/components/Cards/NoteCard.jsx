import React, { useState ,useEffect } from 'react'
import {MdOutlinePushPin} from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import axios from 'axios';

const NoteCard = ({title, date, content, tags, isPinned, onEdit, onDelete, onPinNote}) => {

    return (
        <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-sm font-medium'>{title}</h6>
                    <span className='text-xs text-vista_blue'>{date}</span>
                </div>
                <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-leather' : 'text-light_tan'}`} onClick={onPinNote} />
            </div>
            <p className='text-xs text-leather mt-2'>{content?.slice(0, 60)}</p>
            <div className='flex items-center gap-2 justify-between'>
                <div className='text-xs text-light_tan'>{tags}</div>
                <div className='flex items-center gap-2'>
                    <MdCreate className='text-leather cursor-pointer icon-btn hover:text-apricot' onClick={onEdit} />
                    <MdDelete className='text-red-600 cursor-pointer icon-btn hover:text-apricot' onClick={onDelete} />
                </div>
            </div>
        </div>
    )
}

export default NoteCard