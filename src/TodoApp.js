// src/TodoApp.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { addTodo, toggleTodo, deleteTodo } from "./redux/actions";

function TodoApp() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleAddTodo = () => {
    if (task.trim()) {
      dispatch(addTodo(task));
      setTask("");
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));

    // Xóa công việc sau 3 giây nếu nó được đánh dấu hoàn thành
    setTimeout(() => {
      const todo = todos.find((item) => item.id === id);
      if (todo && todo.completed) {
        dispatch(deleteTodo(id));
      }
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách công việc</Text>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Nhập công việc cần làm"
      />
      <Button title="Thêm" onPress={handleAddTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <TouchableOpacity onPress={() => handleToggleTodo(item.id)}>
              <Text style={[styles.todo, item.completed && styles.completed]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
              <Text style={styles.deleteButton}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  todo: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  deleteButton: {
    fontSize: 18,
    color: "red",
    paddingHorizontal: 8,
  },
});

export default TodoApp;
