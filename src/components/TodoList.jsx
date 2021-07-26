import React from 'react'
import Button from '@atlaskit/button'
import TOdo from './TOdo'

export default function TodoList({todoList, onCheckDone}) {
    return (
        <>
        {
            todoList.map((todo) => (
                <TOdo key ={todo.id} todo={todo} onCheckDone = {onCheckDone} />
            ))
        }
            
        </>
    )
}
