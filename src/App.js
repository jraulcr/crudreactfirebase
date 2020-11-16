//https://www.youtube.com/watch?v=dw8g8zo20Hs
import React, { Component } from "react";
import firebase from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "./App.css";

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form: {
      canal: "",
      idioma: "",
      pais: "",
      suscriptores: "",
    },
    id: 0,
  };

  peticionGet = () => {
    firebase.child("canales").on("value", (canal) => {
      if (canal.val() !== null) {
        this.setState({ ...this.state.data, data: canal.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  peticionPost = () => {
    firebase.child("canales").push(this.state.form, (error) => {
      if (error) console.log(error);
    });
    this.setState({ modalInsertar: false });
  };

  peticionPut = () => {
    firebase.child(`canales/${this.state.id}`).set(this.state.form, (error) => {
      if (error) console.log(error);
    });
    this.setState({ modalEditar: false });
  };

  peticionDelete=()=>{
    if(window.confirm(`Estás seguro que deseas eliminar el canal ${this.state.form && this.state.form.canal}?`))
    {
    firebase.child(`canales/${this.state.id}`).remove(
      error=>{
        if(error)console.log(error)
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };
  seleccionarCanal=async(canal, id, caso)=>{
    this.setState({ form: canal, id: id });
    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()
  }

  /*editarCanal = (canal, id, caso) => {
    this.setState({ form: canal, id: id });
    caso === "Editar" && this.setState({ modalEditar: true });
  };*/

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    return (
      <div className="App">
        <br />
        <button
          className="btn btn-success"
          onClick={() => this.setState({ modalInsertar: true })}
        >
          Insertar
        </button>{" "}
        <br />
        <br />
        <table className="table table-bordered">
          <thead>
            <th>Canal</th>
            <th>Idioma</th>
            <th>Pais</th>
            <th>Suscriptores (en millones)</th>
            <th>Acciones</th>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map((i) => {
              //console.log(i);
              return (
                <tr key={i}>
                  <td>{this.state.data[i].canal}</td>
                  <td>{this.state.data[i].idioma}</td>
                  <td>{this.state.data[i].pais}</td>
                  <td>{this.state.data[i].suscriptores}</td>
                  <td>
                  <button className="btn btn-primary" onClick={()=>this.seleccionarCanal(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                  <button className="btn btn-danger" onClick={()=>this.seleccionarCanal(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>Insertar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Canal: </label>
          <br />
          <input type="text" className="form-control" name="canal" onChange={this.handleChange}/>
          <br />
          <label>País: </label>
          <br />
          <input type="text" className="form-control" name="pais" onChange={this.handleChange}/>
          <br />
          <label>Idioma: </label>
          <br />
          <input type="text" className="form-control" name="idioma" onChange={this.handleChange}/>
          <br />
          <label>Cantidad de Suscriptores (millones): </label>
          <br />
          <input type="text" className="form-control" name="suscriptores" onChange={this.handleChange}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>



 <Modal isOpen={this.state.modalEditar}>
      <ModalHeader>Editar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Canal: </label>
          <br />
          <input type="text" className="form-control" name="canal" onChange={this.handleChange} value={this.state.form && this.state.form.canal}/>
          <br />
          <label>País: </label>
          <br />
          <input type="text" className="form-control" name="pais" onChange={this.handleChange} value={this.state.form && this.state.form.pais}/>
          <br />
          <label>Idioma: </label>
          <br />
          <input type="text" className="form-control" name="idioma" onChange={this.handleChange} value={this.state.form && this.state.form.idioma}/>
          <br />
          <label>Cantidad de Suscriptores (millones): </label>
          <br />
          <input type="text" className="form-control" name="suscriptores" onChange={this.handleChange} value={this.state.form && this.state.form.suscriptores}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>
      </div>
    );
  }
}

export default App;
