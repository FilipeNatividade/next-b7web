import { Todo } from '@/types/Todo'
import React, { useEffect, useState } from 'react'


// assim que se faz para renderizar do lado do servidor, add o getServerSideProps:

type Props = {
    todo: Todo[]
}

// const Todo = ({ todo }: Props) => {
//     return (
//         <div>
//             <h1>Lista de tarefas</h1>

//             <ul style={{ border: '1px solid black', padding: '50px', margin: '0 50px' }}>
//                 {todo.map((item) => (
//                     <li key={item.id} style={{ margin: "10px 0", listStyle: 'none' }}>
//                         <h3>title:</h3> {item.title} - {item.completed.toString()}
//                         <hr />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export const getServerSideProps = async () => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
//     const todoList: Todo[] = await res.json()

//     return {
//         props: {
//             todo: todoList
//         }
//     }
// }

// export default Todo

// ===================================================================================================

// assim faz para renderizar do lado do cliente, react em seu funcionamento normal:

const Todo = () => {
    const [todoList, setTodoList] = useState<Todo[]>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadTodos()
    }, [])

    const loadTodos = async () => {
        setLoading(true)
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
        const list = await res.json()
        setTodoList(list)
        setLoading(false)
    }

    return (
        <div>
            <h1>Lista de tarefas</h1>

            {loading && <h4>Carregando...</h4>}

            <ul style={{ border: '1px solid black', padding: '50px', margin: '0 50px' }}>
                {todoList?.map((item) => (

                    <li key={item.id} style={{ margin: "10px 0", listStyle: 'none' }}>

                        <h3>title:</h3> {item.title} - {item.completed.toString()}

                        <hr />
                    </li>

                ))}
            </ul>
        </div>
    )
}

export default Todo