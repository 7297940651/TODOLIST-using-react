import React, { useState,useEffect } from 'react'

import img from '../image/img.png'
import "../App.css"

const getLocal=()=>{
    let list=localStorage.getItem("lists")
    if(list){
        return JSON.parse(localStorage.getItem("lists"))
    }
    else{
        return []
    }
}
const NotesTo = () => {

    const [inputdata,setinputdata]=useState("")
    const [items,setitems]=useState(getLocal())

    const addItem=()=>{
        if(!inputdata){
            alert("add item");
        }
        else{
            setitems([...items,[inputdata]])
          setinputdata('')
            
        }
        

    }

    const deleteItem=(id)=>{

       const updateItems= items.filter((ele,ind)=>{
            return(
                ind!==id
            )
        })
        setitems(updateItems)

    }
    const removeAll=()=>{
        setitems([])
    }

    useEffect(() => {
        localStorage.setItem('lists',JSON.stringify(items))
    }, [items])

    return (
        <>

        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src={img} alt="todo" />
                    <figcaption>Add Your List Here ✌</figcaption>

                </figure>
                
                <div className="addItems">

                <input type="text" placeholder="✍Add Items..."
                    value={inputdata}
                    onChange={(e)=>{
                        setinputdata(e.target.value)
                    }}
                />
                <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>

                </div>

                <div className="showItems">
                {
                    items.map((ele,ind)=>{
                        return(
                            <div className="eachItem" key={ind}>

                    

                    <h3>{ele}</h3>
                    <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={()=>{
                        deleteItem(ind)
                    }}></i>


                    </div>

                        )
                    })
                }
                    
                </div>

                <div className="showItems">

                <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>

                </div>

            </div>
        </div>
            
        </>
    )
}

export default NotesTo
