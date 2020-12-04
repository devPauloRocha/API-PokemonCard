import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Text, StatusBar, FlatList, Image, TouchableOpacity, Modal, TouchableHighlight, } from 'react-native';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemons: []
        };

        fetch('https://api.pokemontcg.io/v1/cards').then((retorno) => retorno.json())
            .then((Rjson) => {
                let s = this.state;
                s.pokemons = Rjson.cards;

                this.setState(s);


            });

    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.pokemons}
                    renderItem={
                        ({ item }) => < Pokemon data={item} />
                    } />
            </View>
        );
    }
}


class Pokemon extends Component {

    constructor(props) {
        super(props);
        this.state = { modalVisible: false };

        this.caracteristica = this.caracteristica(this);
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    caracteristica() {

    }

    render() {
        const { modalVisible } = this.state;
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Nome: {this.props.data.name} </Text>
                            <Text style={styles.modalText}>Pokedex: {this.props.data.nationalPokedexNumber} </Text>
                            <Text style={styles.modalText}>Numero: {this.props.data.number} </Text>
                            <Text style={styles.modalText}>Tipo: {this.props.data.types} </Text>
                            <Text style={styles.modalText}>Subtipo: {this.props.data.subtype} </Text>
                            <Text style={styles.modalText}>Vida: {this.props.data.hp} </Text>
                            <Text style={styles.modalText}>Raridade: {this.props.data.rarity} </Text>
                            <Text style={styles.modalText}>Tipo: {this.props.data.types} </Text>
                            <Text style={styles.modalText}>______________</Text>
                            <Text style={styles.modalText}>{this.props.data.text} </Text>
                            
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Voltar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => { this.setModalVisible(true); }} >
                    <Image source={
                        { uri: this.props.data.imageUrl }
                    }
                        style={styles.imgPokemon} />
                </TouchableOpacity >
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
    },

    imgPokemon: {
        width: 320,
        height: 445,
        marginTop: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
        
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
