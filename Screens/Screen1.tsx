import React, { useEffect, useState } from 'react';
import { Fondo } from '../Components/Fondo';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Line } from '../Components/Line';
import { AddButton } from '../Components/AddButton';
import { NoTask } from '../Components/NoTask';
import { TaskContainer } from '../Components/TaskContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Screen1 = () => {

  const [nextTaskIndex, setNextTaskIndex] = useState(0); // Índice de la próxima tarea a reemplazar
  const [totalTasks, setTotalTasks] = useState(8);
  const [tasks, setTasks] = useState<{ id: number; isChecked: boolean; textInputValue: string }[]>([]);
  const [Taskcount, setTaskcount] = useState(0);
  const [textInputValues, setTextInputValues] = useState<string[]>(Array.from({ length: 200}, () => ""));
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); 
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null); 
  
  //AsyncStorage.clear();
  useEffect(() => {
    // Cargar las tareas almacenadas en AsyncStorage al iniciar la aplicación
    loadTasks();
    // Cargar los valores de texto almacenados en AsyncStorage al iniciar la aplicación
    loadTextInputValues();
    setNextTaskIndex(tasks.length-1)
  }, []);
  

  useEffect(() => {
    // Guardar las tareas en AsyncStorage cuando cambien
    saveTasks();
    
  }, [tasks]);

  const saveTextInputValues = async (textInputValuesToSave: string[]) => {
    try {
      await AsyncStorage.setItem('textInputValues', JSON.stringify(textInputValuesToSave));
    } catch (error) {
      console.log('Error saving text input values:', error);
    }
  };
  

  const loadTextInputValues = async () => {
    try {
      const savedTextInputValues = await AsyncStorage.getItem('tasks');
      if (savedTextInputValues !== null) {
        setTextInputValues(JSON.parse(savedTextInputValues));
      } else {
        setTextInputValues(Array.from({ length: 200 }, () => " "));
      }
    } catch (error) {
      console.log('Error loading text input values:', error);
    }
  };
  

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if(savedTasks!=null){
        const parsedTasks = JSON.parse(savedTasks); // Parsear la cadena JSON a un array de objetos
        setTaskcount(parsedTasks.length); // Obtener la longitud del array
        console.log(parsedTasks.length);
      }
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      } else {
        setTasks(
          Array.from({ length: 200 }, (_, index) => ({
            id: index,
            isChecked: false,
            textInputValue:'',
          }))
        );
        loadTextInputValues();
      }
    } catch (error) {
      console.log('Error loading tasks:', error);
    }
  };
  
  const saveTasks = async () => {
    try {
      const tasksToSave = tasks.filter(task => task.id != null && task.textInputValue!=undefined && task.textInputValue!='' && task.textInputValue!='Enter a description' && task.textInputValue!=' '); // Filtrar las instancias de NoTask
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave)); // Guardar el nuevo array
      setTaskcount(tasks.length)
    } catch (error) {
      console.log('Error saving tasks:', error);
    }
  };
  
  
  


  
  const addTask = () => {
    handleDialogClose()
    const newTask = {
      id: tasks.length,
      isChecked: false,
      textInputValue: "",
    };
    
    setTasks([...tasks, newTask]);
  };
  
  
  
  
  
/*
  const handleCheckToggle = (taskId: number, isChecked: boolean) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskId].isChecked = isChecked;
    if (isChecked) {
      // Mover la tarea marcada al final del array
      const taskToMove = updatedTasks.splice(taskId, 1)[0];
      updatedTasks.push(taskToMove);
    } else {
      // Mover la tarea desmarcada al principio del array
      const taskToMove = updatedTasks.splice(taskId, 1)[0];
      updatedTasks.unshift(taskToMove);
    }
  
    setTasks(updatedTasks);
  };
  */

  const handleCheckToggle = (taskId: number, isChecked: boolean) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskId].isChecked = isChecked;
    setTasks(updatedTasks);
  };
 
  const handleTextInputChange = (index: number, newText: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].textInputValue = newText;
    setTasks(updatedTasks);
  };
  
  
  const sortedTasks = tasks.slice().sort((taskA, taskB) => {
    if (!taskA.isChecked && taskB.isChecked) {
      return -1;
    }
    if (taskA.isChecked && !taskB.isChecked) {
      return 1;
    }
    return 0;
  });

  const handleLongPress = (taskId: number) => {
    setTaskToDelete(taskId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirmed = () => {
    if (taskToDelete !== null) {
      const updatedTasks = tasks.filter(task => task.id !== taskToDelete);
      setTasks(updatedTasks);
      setShowDeleteDialog(false);
      setTaskToDelete(null);
    }
  };
  
  const handleDialogClose = () => {
    setShowDeleteDialog(false);
  };

  return (
    <TouchableOpacity onPress={handleDialogClose} style={styles.fullScreenOverlay}>
    <View style={{ flex: 1 }}>
      <Fondo />
      <View style={styles.textContainer}>
        <View style={{flex:1/10}}/>
        <Text style={styles.text}>To do list</Text>
        <View style={styles.lineContainer}>
            <Line />
        </View>
        <View style={{flex:1/32}}></View>
        <Text style={styles.textSub}>YOUR TASKS LIST</Text>
        <View style={{flex:1/55}}/>
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
          {sortedTasks.map(task => (
            <View key={task.id} style={styles.taskContainer}>
              <TaskContainer
                id={task.id}
                isChecked={task.isChecked}
                onCheckToggle={handleCheckToggle}
                textInputValue={task.textInputValue}
                onTextInputChange={text => handleTextInputChange(task.id, text)}
                onLongPress={() => handleLongPress(task.id)}
                onPress={()=>handleDialogClose()}
              />
            </View>
          ))}
          {/* Agregar tareas vacías si es necesario */}
          {Array.from({ length: Math.max(8  - sortedTasks.length, 0) }).map((_, index) => (
            <View key={`empty-${index}`} style={styles.taskContainer}>
              <NoTask />
            </View>
          ))}
        </ScrollView>
        <View style={{marginLeft:270, marginBottom:5}}>
          <AddButton onPress={addTask} />
        </View>
        {showDeleteDialog && (
          <View style={styles.deleteDialogContainer}>
            <Text style={styles.deleteDialogTitle}>Confirmar Eliminación</Text>
            <Text style={styles.deleteDialogText}>¿Estás seguro de que deseas eliminar esta tarea?</Text>
            <TouchableOpacity style={styles.deleteDialogButton} onPress={handleDeleteConfirmed}>
              <Text style={styles.deleteDialogButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteDialogButton} onPress={() => setShowDeleteDialog(false)}>
              <Text style={styles.deleteDialogButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginRight:-60,
    marginLeft:-60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFFFFF',
    opacity:0.1
  },
  textContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      position: 'absolute',
      top: 0,
      left: 34,
      right: 34,
      bottom: 0,
      paddingTop: 20
  },
  text: {
    color: '#FFFFFF',
    fontSize: 45,
    fontFamily: 'Inter-Bold'
  },
  textSub: {
      color: '#BCC3D6',
      fontSize: 15,
      fontFamily: 'Inter-Regular',
      left:5
    },
  lineContainer: {
      alignSelf: 'stretch', 
  },
  taskContainer: {
      alignSelf: 'stretch',
      alignItems:'center',
      flex: 1/12,
      marginTop:10
  },
  button: {
    alignSelf: 'stretch',
    alignItems:'flex-start',
    flex: 1/128,
    marginLeft: 250,
    justifyContent: 'flex-start'
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingTop: 20,
  },
  
  deleteDialogContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    top: '40%',
    elevation: 5,
    pointerEvents: 'auto',
  },
  deleteDialogLocker: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity:0.4,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    height: '100%',
    elevation: 5,
  },
  deleteDialogTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 10,
  },
  deleteDialogText: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily:'Inter-Regular'
  },
  deleteDialogButton: {
    backgroundColor: '#25499A',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteDialogButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold'
  },
  fullScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});
