import React from 'react';
import { createStackNavigator } from 'react-navigation'
// screens
import HomeScreen from './src/screens/Home';
import EditTodoScreen from './src/screens/EditTodo';


const Routes = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    EditTodo: {
        screen: EditTodoScreen
    }
},{
    initialRouteName: 'Home'
})

export default Routes
