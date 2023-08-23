import React, { useEffect, useState} from "react";
import { View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Check } from "./Check";

interface TaskContainerProps {
  id: number;
  isChecked: boolean;
  onCheckToggle: (taskId: number, isChecked: boolean) => void;
  textInputValue: string; 
  onTextInputChange: (text: string) => void; 
  onLongPress: () => void; 
  onPress: () => void;
}



export const TaskContainer: React.FC<TaskContainerProps> = ({ id, onCheckToggle, textInputValue, onTextInputChange, onLongPress, onPress }) => {
 
  const [isChecked, setIsChecked] = useState(false); // Estado para el componente Check
  const [clickCount, setClickCount] = useState(0); // Estado para rastrear el número de clics en el TextInput
  const [editable, setEditable] = useState(false); // Estado para controlar la edición del TextInput

  const handleTextInputChange = (newText: string) => {
    onTextInputChange(newText); // Llamar a la función proporcionada desde Screen1
  };
  // Cargar el valor del AsyncStorage cuando se monta el componente
  useEffect(() => {
    loadTextInputValue();
    loadCheckValue();
  }, []);

  // Función para cargar el valor almacenado en AsyncStorage
  const loadTextInputValue = async () => {
    try {
      const value = await AsyncStorage.getItem(`textInputValue_${id}`);
      if (value !== null) {
        textInputValue=value;
      }
    } catch (error) {
      console.log("Error loading text input value:", error);
    }
  };

  const loadCheckValue = async () => {
    try {
      const value = await AsyncStorage.getItem(`isChecked_${id}`);
      if (value !== null) {
        setIsChecked(value === "true");
      }
    } catch (error) {
      console.log("Error loading check value:", error);
    }
  };
  

  // Función para guardar el valor en AsyncStorage
  const saveTextInputValue = async () => {
    try {
      await AsyncStorage.setItem(`textInputValue_${id}`, textInputValue);
    } catch (error) {
      console.log("Error saving text input value:", error);
    }
  };

    // Función para guardar el valor en AsyncStorage para el Check
    const saveCheckValue = async (newIsChecked: boolean) => {
      try {
        await AsyncStorage.setItem(`isChecked_${id}`, newIsChecked.toString());
      } catch (error) {
        console.log("Error saving check value:", error);
      }
    };
    

  const handleClick = () => {
    setEditable(true);
    onPress()
  };

  const handleTextInputBlur = () => {
    saveTextInputValue();
    setEditable(false);
  };

  
  const handleCheckToggle = () => {
    const newIsChecked = !isChecked;
    onPress();
    setIsChecked(newIsChecked);
    saveCheckValue(newIsChecked);
    onCheckToggle(id, !isChecked);
  };
  
  
  

  return (
    <View style={styles.container}>
      <Check style={styles.check} isChecked={isChecked} onPress={handleCheckToggle}   />
      <TouchableOpacity onLongPress={onLongPress}
        style={{left:-60, flex: 1, alignSelf: "flex-start", width: "auto" }}
        onPress={handleClick}
      >
        <TextInput
          value={textInputValue}
          onChangeText={onTextInputChange}
          onBlur={handleTextInputBlur}
          editable={editable}
          placeholder="Enter a description"
          placeholderTextColor="#BCC3D6"
          style={[
            styles.textInput,
            isChecked ? styles.strikethrough : null,
            isChecked ? null : styles.textInput,
          ]}
        />

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 340,
    height: 50,
    borderRadius: 17,
    backgroundColor: "#213976",
    opacity: 1,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily:'Inter-Regular',
    padding: 10,
    textDecorationLine:'none'
  },
  check: {
    marginLeft: "auto",
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#BCC3D6', 
  },
});
