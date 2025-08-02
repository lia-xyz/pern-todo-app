export const mapTodo = todo => {
    return {
        id: todo.id,
        title: todo.title,
        isCompleted: todo.is_completed
    }
}