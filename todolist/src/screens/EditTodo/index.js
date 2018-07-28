import React, { Component } from 'react'
import { Alert } from 'react-native'
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Button,
    Text,
    List,
    ListItem,
    Left,
    Right,
    Icon,
    Card,
    CardItem,
} from 'native-base';
import * as firebase from 'firebase'
import PopupDialog from 'react-native-popup-dialog';

export default class EditTodoScreen extends Component{
    static navigationOptions = {
        title: 'EditTodo'
    }
    constructor(){
        super()
        this.state = {
            judul: '',
            deskripsi: '',
        }
    }
    editHandle = (key) => {
        firebase.database().ref(`todos/${key}`).set({
            judul: this.state.judul,
            deskripsi: this.state.deskripsi
        })
        this.setState({
            judul: '',
            deskripsi: '',
        })
        Alert.alert('update success')
    }

    render () {
        const getParam = this.props.navigation.getParam('text', ' test ')
        return (
            <Container>
                <Content>
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
                                     onPress={()=> this.editHandle(getParam.key)}
                                >
                                    <Icon
                                            type="FontAwesome"
                                            android="pencil"
                                            ios='pencil'
                                    />
                                    <Text>UPADTE</Text>
                                </Button>
                            {/* </Item> */}
                        </Form>
                    </Card>
                </Content>
            </Container>
        )
    }
}