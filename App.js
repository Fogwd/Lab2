import { useState } from "react";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";

const width = Dimensions.get('window').width;

const Button = ({ text, onPress, textStyle, buttonStyle }) => (
  <TouchableOpacity onPress={onPress} style={buttonStyle}>
    <Text style={textStyle}>{text}</Text>
  </TouchableOpacity>
);

export default () => {
  const [result, setResult] = useState(0);
  const [expression, setExpression] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const operators = ["/", "*", "-", "+"];
  

  const handleTap = (value) => {
    if (value === "clear") {
      setResult("");
      setExpression("");
    } else if (value === "CE") {
      setExpression(expression.slice(0, -1));
    } else if (value === "posneg") {
      if (expression.startsWith("-")) {
        setExpression(expression.slice(1));
      } else {
        setExpression(`-${expression}`);
      }
    } else if (value === "=") {
      try {
        const evalResult = eval(expression);
        setResult(evalResult.toString());
      } catch (error) {
        setResult("ERROR");
      }
    } else if (value === "percentage") {
      try {
        const evalResult = eval(expression) / 100;
        setResult(evalResult.toString());
        setExpression(evalResult.toString());
      } catch (error) {
        setResult("SYNTAX ERROR");
      }
    } else {
      if (operators.includes(value) && operators.includes(expression.slice(-1)) && expression!=="") {
        setExpression(expression.slice(0, -1) + value);
      } else {
        setExpression(expression + value);
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? "#141414" : "#efefef",
    },
    result: {
      fontWeight: "600",
      color: darkMode ? "#fff" : "#000",
      fontSize: 50,
      textAlign: "right",
      marginRight: 20,
      marginBottom: 10,
    },
    expression: {
      color: darkMode ? "#aaa" : "#222",
      fontSize: 30,
      textAlign: "right",
      marginRight: 20,
      marginBottom: 5,
    },
    numberText: {
      color: darkMode ? "#fff" : "#000",
      fontSize: 25,
    },
    functionText: {
      color: darkMode ? "#fff" : "#000",
      fontSize: 23,
    },
    operatorText: {
      color: darkMode ? "#fff" : "#000",
      fontSize: 25,
    },
    number: {
      backgroundColor: darkMode ? "#333" : "#dddddd",
      flex: 1,
      width: width / 4 - 5,
      maxWidth: 120,
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      margin: 2,
    },
    function: {
      backgroundColor: darkMode ? "#444" : "#bbbbbb",
      flex: 1,
      maxWidth: 120,
      width: width / 4 - 5,
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      margin: 2,
    },
    operator: {
      backgroundColor: darkMode ? "#555" : "#cacaca",
      flex: 1,
      maxWidth: 120,
      width: width / 4 - 5,
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      margin: 2,
    },
    themeToggle: {
      alignContent: 'center',
      alignItems: 'center',
      width: 48,
      height: 48,
      margin: 5,
      backgroundColor: darkMode ? "#efefef" : "#313131",
      borderRadius: 50,
      padding: 7
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>

      <TouchableOpacity style={styles.themeToggle} onPress={() => setDarkMode(!darkMode)}>
        <Entypo name={darkMode ? "light-up" : "moon"} size={32} color={darkMode ? "black" : "white"} />
      </TouchableOpacity>
      
      <View style={{flex: 1, width: "100%"}}></View>
        <Text style={styles.expression}>{expression}</Text>
        <Text style={styles.result}>{result}</Text>

        <View style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5, justifyContent: 'space-between' }}>
          <Button textStyle={styles.functionText} buttonStyle={styles.function}
            onPress={() => handleTap("clear")} text="C"></Button>
          <Button textStyle={styles.functionText} buttonStyle={styles.function}
            onPress={() => handleTap("CE")} text="CE"></Button>
          <Button text="%" onPress={() => handleTap("percentage")}
            textStyle={styles.functionText} buttonStyle={styles.function}></Button>
          <Button text="/" onPress={() => handleTap("/")}
            textStyle={styles.operatorText} buttonStyle={styles.operator}></Button>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5, justifyContent: 'space-between' }}>
          <Button text="7" onPress={() => handleTap(7)}
            textStyle={styles.numberText} buttonStyle={styles.number}></Button>
          <Button text="8" onPress={() => handleTap(8)}
            textStyle={styles.numberText} buttonStyle={styles.number}></Button>
          <Button text="9" onPress={() => handleTap(9)}
            textStyle={styles.numberText} buttonStyle={styles.number}></Button>
          <Button onPress={() => handleTap("*")} text="x"
            textStyle={styles.operatorText} buttonStyle={styles.operator}></Button>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5, justifyContent: 'space-between' }}>
          <Button text="4" onPress={() => handleTap(4)}
            textStyle={styles.numberText} buttonStyle={styles.number}></Button>
          <Button text="5" onPress={() => handleTap(5)}
            textStyle={styles.numberText} buttonStyle={styles.number}></Button>
          <Button text="6" onPress={() => handleTap(6)}
            textStyle={styles.numberText} buttonStyle={styles.number}></Button>
          <Button onPress={() => handleTap("-")} text="-"
            textStyle={styles.operatorText} buttonStyle={styles.operator}></Button>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5, justifyContent: 'space-between' }}>
          <Button text="1" onPress={() => handleTap(1)}
            textStyle={styles.numberText} buttonStyle={styles.number}></Button>
          <Button text="2" onPress={() => handleTap(2)}
            textStyle={styles.numberText} buttonStyle={styles.number}></Button>
          <Button text="3" onPress={() => handleTap(3)}
            textStyle={styles.numberText} buttonStyle={styles.number}></Button>
          <Button onPress={() => handleTap("+")} text="+"
            textStyle={styles.operatorText} buttonStyle={styles.operator}></Button>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5, justifyContent: 'space-between', marginBottom: 3 }}>
          <Button text="+/-" onPress={() => handleTap("posneg")}
            textStyle={styles.functionText} buttonStyle={styles.function}></Button>
          <Button text="0" onPress={() => handleTap(0)}
            textStyle={styles.numberText} buttonStyle={styles.number}></Button>
          <Button text="." onPress={() => handleTap(".")}
            textStyle={styles.functionText} buttonStyle={styles.function}></Button>
          <Button onPress={() => handleTap("=")} text="="
            textStyle={[styles.operatorText, { color: '#dddddd' }]} buttonStyle={[styles.operator, { backgroundColor: "#2266cc" }]}></Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
