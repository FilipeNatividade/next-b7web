import { Todo } from '@/types/Todo'
import React from 'react'

type Props = {
    todo: Todo[]
}

const Todo = ({ todo }: Props) => {
    return (
        <div>
            <h1>Lista de tarefas</h1>

            <ul style={{ border: '1px solid black', padding: '50px', margin: '0 50px' }}>
                {todo.map((item) => (
                    <li key={item.id} style={{ margin: "10px 0", listStyle: 'none' }}>
                        <h3>title:</h3> {item.title} - {item.completed.toString()}
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const getServerSideProps = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
    const todoList: Todo[] = await res.json()

    return {
        props: {
            todo: todoList
        }
    }
}

export default Todo