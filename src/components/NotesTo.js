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
    const [toggle,settoggle]=useState(true)
    const [edit,setedit]=useState(null)

    const addItem=()=>{
        if(!inputdata){
            alert("add item");
        }else if(inputdata && !toggle){

            setitems(
                items.map((ele)=>{
                    if(ele.id===setedit){
                        return {...ele,name:inputdata}
                    }
                    return ele
                })
            )
            setedit(null)
            settoggle(true)
            setinputdata('')

        }
        else{
            const allUpdated={id:new Date().getTime().toString(),name:inputdata}
            setitems([...items,allUpdated])
            console.log(allUpdated)
          setinputdata('')
            
        }
        

    }

    const deleteItem=(index)=>{

       const updateItems= items.filter((ele)=>{
            return(
                index!==ele.id
            )
        })
        setitems(updateItems)

    }

    const editItem=(id)=>{

        let editItem= items.find((ele)=>{
            return ele.id===id
        })
        settoggle(false)
        console.log(editItem)
        setinputdata(editItem.name)

        setedit(id)

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
                {
                    
                toggle?<i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>:<i className="far fa-edit add-btn" title="updated Item" onClick={addItem}></i>
                }
                </div>

                <div className="showItems">
                {
                    items.map((ele)=>{
                        return(
                            <div className="eachItem" key={ele.id}>
                             <h3>{ele.name}</h3>
                             <div className="todo-btn">
                              <i className="far fa-edit add-btn" title="Edit Item" onClick={()=>{
                        editItem(ele.id)
                         }}></i>
                         <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={()=>{
                        deleteItem(ele.id)
                        }}></i>
                        </div>
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
