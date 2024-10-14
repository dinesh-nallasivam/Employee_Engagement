
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function DefaultTable({tableDetails,handleSelected,handleEdit,handleDelete}) {
    return (
        <table className="w-full table-auto">
            <thead className="sticky top-0 bg-white border-b border-zinc-300">
                <tr>
                    {
                        tableDetails.header.map((element, index) => (
                            <th 
                                key={index}
                                className="py-2 px-4 text-center text-sm font-medium text-black uppercase">
                                {element}
                            </th>
                        ))
                    }
                    {
                        (handleDelete || handleEdit) && (
                            <th className="py-2 px-4 text-center text-sm font-medium text-black uppercase">
                                Actions
                            </th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    tableDetails.body.length==0?(
                        <tr className="bg-white">
                            <td 
                                colSpan={tableDetails.header.length+1}
                                className="p-4 text-center text-sm uppercase text-mediun text-zinc-400">
                                No data available
                            </td>
                        </tr>
                    ):(
                        <>
                            {
                                tableDetails.body.map((element, index) => (
                                    <tr
                                        className={`bg-white border-b border-zinc-300 hover:bg-zinc-300 ${handleSelected && "cursor-pointer"}`} 
                                        key={index}
                                        onClick={()=> {if(handleSelected) handleSelected(element)}}
                                    >
                                        {
                                            element.map((item, subIndex) => {
                                                
                                                if(subIndex==0){
                                                    return
                                                }

                                                if(typeof item === 'object' && item != null){

                                                    return <td 
                                                        key={subIndex}
                                                        className="px-4 py-2 text-sm font-normal text-center capitalize">
                                                            <div className="flex items-center gap-2 justify-center">
                                                                <img src={item.image} alt="profile" className="w-8 h-8 rounded-full"/>
                                                                <span>{item.name}</span>
                                                            </div>
                                                    </td>
                                                }

                                                return <td 
                                                    key={subIndex}
                                                    className="px-4 py-2 text-sm font-normal text-center capitalize">
                                                        {item? item : "-"}
                                                </td>
                                            })
                                        }
                                        {
                                            (handleDelete || handleEdit) && (
                                                <td className="px-4 py-2 pt-3 flex items-center justify-center gap-4">
                                                    {
                                                        handleEdit && (
                                                            <FiEdit className="w-5 h-5 cursor-pointer text-blue-600" onClick={(event)=>handleEdit(event,element)} />
                                                        )
                                                    }
                                                    {
                                                        handleDelete && (
                                                            <MdDelete className="w-5 h-5 cursor-pointer text-red-600" onClick={(event)=>handleDelete(event,element)}/>
                                                        )
                                                    }
                                                </td>
                                            )
                                        }
                                    </tr>
                                ))
                            }
                        </>
                    )
                }
            </tbody>
        </table>
    );
}

export default DefaultTable;