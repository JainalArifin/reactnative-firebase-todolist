import React, { Component } from 'react'
import { FlatList } from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Button,
    Text,
    Card,
    CardItem,
    Left,
    Right,
    Icon
} from 'native-base';
import * as firebase from 'firebase'

const config = {
    databaseURL: "https://test-firebase-39e4d.firebaseio.com",
};
firebase.initializeApp(config);

//style
import styles from './style'


export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props){
        super(props)
        this.state = {
            judul: '',
            deskripsi: '',
            todos: null,
        }
    }

    componentDidMount(){
        firebase.database().ref('todos').on('value', (snapshot)=>{
            // console.log(snapshot.val())
            this.setState({
                todos: snapshot.val()
            })
        })
    }

    addTodo = () => {
        let postsRef = firebase.database().ref().child("todos");
        let newPostRef = postsRef.push();
        newPostRef.set({
            judul: this.state.judul,
            deskripsi: this.state.deskripsi
        });
        this.setState({
            judul: '',
            deskripsi: '',
        })
    }

    removeTodo = (key) => {
        firebase.database().ref(`todos/${key}`).remove()
    }

    render () {
        const todos = !this.state.todos ? [] : Object.keys(this.state.todos).map( key => {
            // console.log(this.state.todos[key].deskripsi, ' <---- 1')
            return {
                key: key,
                judul: this.state.todos[key].judul,
                deskripsi: this.state.todos[key].deskripsi,
            }
        })
        return (
        <Container>
            <Content style={styles.homestyle}>
                <Card>
                    <Form>
                        <Item>
                            <Input
                                placeholder="judul"
                                value={this.state.judul}
                                onChangeText={(text)=> this.setState({judul: text}) }
                            />
                        </Item>
                        <Item>
                            <Input
                                placeholder="deskripsi"
                                value={this.state.deskripsi}
                                onChangeText={(text)=> this.setState({deskripsi: text}) }
                            />
                        </Item>
                        {/* <Item> */}
                            <Button
                                full
                                bordered
                                style={{
                                    margin: 5,
                                }}
                                    onPress={()=> this.addTodo()}
                            >
                                <Icon
                                        type="FontAwesome"
                                        android="pencil"
                                        ios='pencil'
                                />
                                <Text>add todo</Text>
                            </Button>
                        {/* </Item> */}
                    </Form>
                </Card>
                <FlatList
                    data={todos}
                    renderItem={({ item })=>(
                        <Card>
                            <CardItem>
                                <Left
                                    style={{
                                        flex:1,
                                        flexDirection: 'column',
                                    }}
                                >
                                     <Text>judul: {item.judul}</Text>
                                     <Text>deskripsi: {item.deskripsi}</Text>
                                </Left>
                                <Right>
                                    <Button transparent
                                        onPress={()=> this.props.navigation.navigate('EditTodo', {text: item}) }
                                    >
                                        <Icon
                                            type="FontAwesome"
                                            android="pencil"
                                            ios='pencil'
                                        />
                                     </Button>
                                     <Button transparent danger
                                         onPress={()=> this.removeTodo(item.key)}
                                     >
                                        <Icon name='trash' />
                                     </Button>
                                </Right>
                            </CardItem>
                        </Card>
                    )}
                />
            </Content>
        </Container>
        )
    }
}