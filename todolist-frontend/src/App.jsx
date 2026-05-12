import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal, Form, Navbar, Nav, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const API_URL = "http://localhost:3000";
const API_KEY = "ToDo2026";

const FormularioContenido = ({ handleGuardar, inputData, handleInputChange, error, setError, success, vista }) => (
  <Form onSubmit={handleGuardar}>
    {error && <Alert variant="danger" onClose={() => setError(null)} dismissible className="py-2 small">{error}</Alert>}
    {success && <Alert variant="success" className="py-2 small">{success}</Alert>}
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">Nombre de la {vista === 'tareas' ? 'tarea' : 'meta'}</Form.Label>
      <Form.Control type="text" name="nombre" value={inputData.nombre} onChange={handleInputChange} />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">Descripción</Form.Label>
      <Form.Control as="textarea" name="descripcion" value={inputData.descripcion} onChange={handleInputChange} rows={3} />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">Fecha límite</Form.Label>
      <Form.Control type="date" name="fecha" value={inputData.fecha} onChange={handleInputChange} />
    </Form.Group>
    <Button variant="primary" type="submit" className="w-100">Guardar {vista === 'tareas' ? 'tarea' : 'meta'}</Button>
  </Form>
);

function App() {
  const [showModal, setShowModal] = useState(false);
  const [vista, setVista] = useState('tareas');
  const [inputData, setInputData] = useState({ nombre: '', descripcion: '', fecha: '' });
  const [tareas, setTareas] = useState([]);
  const [metas, setMetas] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setError(null);
    setSuccess(null);
  };
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    obtenerDatos();
  }, [vista]);

  const obtenerDatos = async () => {
    const endpoint = vista === 'tareas' ? '/getTasks' : '/getGoals';
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: { 'Authorization': API_KEY }
      });
      if (!response.ok) throw new Error(`Status ${response.status}: Error de conexión`);
      const data = await response.json();
      vista === 'tareas' ? setTareas(data) : setMetas(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setSuccess(null);
    const endpoint = vista === 'tareas' ? '/addTask' : '/addGoal';
    const payload = vista === 'tareas' ? { task: inputData.nombre } : { goal: inputData.nombre };
    
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': API_KEY },
        body: JSON.stringify(payload) 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Status ${response.status}: ${errorData.error || "Error"}`);
      }

      setSuccess(`Status 200: ${vista === 'tareas' ? 'Tarea' : 'Meta'} guardada con éxito`);
      setTimeout(() => {
        obtenerDatos();
        setInputData({ nombre: '', descripcion: '', fecha: '' });
        handleClose();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEliminar = async (id) => {
    const endpoint = vista === 'tareas' ? '/removeTask' : '/removeGoal';
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': API_KEY },
        body: JSON.stringify({ id })
      });
      if (!response.ok) throw new Error(`Status ${response.status}: Error al eliminar`);
      
      setSuccess(`Status 200: ${vista === 'tareas' ? 'Tarea' : 'Meta'} eliminada`);
      obtenerDatos();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const listaActual = vista === 'tareas' ? tareas : metas;

  return (
    <div className="main-wrapper">
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand href="#" className="fw-bold">To Do List</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setVista('tareas')} active={vista === 'tareas'}>Tareas</Nav.Link>
            <Nav.Link onClick={() => setVista('metas')} active={vista === 'metas'}>Metas</Nav.Link>
          </Nav>
          <div className="d-lg-none mt-3">
            <Button variant="primary" className="w-100" onClick={handleShow}>+ Nueva {vista === 'tareas' ? 'tarea' : 'meta'}</Button>
          </div>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid className="py-4 px-lg-5">
        {!showModal && error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
        {!showModal && success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}
        
        <Row>
          <Col lg={4} className="d-none d-lg-block">
            <Card className="shadow-sm p-4 sticky-top">
              <h4 className="mb-4 fw-bold">Nueva {vista === 'tareas' ? 'tarea' : 'meta'}</h4>
              <FormularioContenido 
                handleGuardar={handleGuardar} 
                inputData={inputData} 
                handleInputChange={handleInputChange}
                error={error}
                setError={setError}
                success={success}
                vista={vista}
              />
            </Card>
          </Col>

          <Col xs={12} lg={8}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold text-secondary text-capitalize">{vista}</h3>
              <span className="badge bg-primary rounded-pill">{listaActual.length} Pendientes</span>
            </div>
            
            {listaActual.length === 0 ? (
              <p className="text-muted text-center mt-5">No hay {vista} pendientes.</p>
            ) : (
              listaActual.map((item) => (
                <Card key={item.id} className="tarea-item shadow-sm mb-3">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1 fw-bold">{item.title}</h5>
                      <p className="text-muted small mb-0">ID: {item.id}</p>
                    </div>
                    <Button variant="outline-danger" className="rounded-pill" onClick={() => handleEliminar(item.id)}>Eliminar</Button>
                  </Card.Body>
                </Card>
              ))
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose} centered className="d-lg-none">
        <Modal.Header closeButton><Modal.Title>Agregar {vista === 'tareas' ? 'tarea' : 'meta'}</Modal.Title></Modal.Header>
        <Modal.Body>
          <FormularioContenido 
            handleGuardar={handleGuardar} 
            inputData={inputData} 
            handleInputChange={handleInputChange}
            error={error}
            setError={setError}
            success={success}
            vista={vista}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;